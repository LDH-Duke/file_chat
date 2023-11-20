import React, { useEffect, useRef } from 'react';
import ConferencePresenter from './ConferencePresenter';
import { useDispatch, useSelector } from 'react-redux';
import { initialState } from 'redux/module/drawing';

import { documentActions } from 'redux/module/document';

import JitsiManager from 'utils/jitsi/JitsiManager';
import { USER_JOINED } from 'utils/jitsi/events/conferenceEvents';
import { customCommand } from 'utils/jitsi/events';
import { notification, Radio } from 'antd';
import {
  ADD_DRAWING_SHEET,
  DOCUMENT_SHARING_CHANGE,
  DRAWING_TO_SHEET,
  MODERATOR_SELECT_IMAGE,
  REQUEST_SAY,
  SHARE_DRAWING_DATA,
} from 'utils/jitsi/events/customCommand';
// eslint-disable-next-line
import { drawingActions } from 'redux/module/drawing';
import { JitsiCommandHooks } from 'components/Jitsi';
import { MessageAlert } from 'utils';

const { SHARE_DOCUMENT_FILE, BROADCAST_VOTE } = customCommand;

const ConferenceContainer = () => {
  /* ETC */
  const jitsiManager = new JitsiManager();
  /* Router */
  // const history = useHistory();
  /* State */
  const {
    id: localUserId,
    isModerator,
    name,
  } = useSelector((state) => state.localUser);
  const isInvited = useSelector((state) => state.conference.isInvited);
  const isJoined = useSelector((state) => state.conference.isJoined);
  /* Hooks */
  const dispatch = useDispatch();

  const isModeratorRef = useRef(isModerator);

  useEffect(() => {
    isModeratorRef.current = isModerator;

    return () => {
      isModeratorRef.current = null;
    };
  }, [isModerator]);

  /* Functions */
  // 정보 공유 함수
  // const shareConferenceInfo = (userId) => {
  //   console.log('FLAG : 방장이 정보 공유!!!');

  //   jitsiManager.sendCommand(SHARE_DOCUMENT_FILE, {
  //     value: userId,
  //     attributes: sharingDocumentList,
  //   });

  //   const jsonSheets = JSON.stringify(sheets);

  //   jitsiManager.sendCommand('SHARE_DRAWING_DATA', {
  //     value: userId,
  //     children: jsonSheets,
  //   });
  // };

  /**
   * @title 투표 활성화 핸들러
   * @param {object} vote
   */
  const notifyVote = (vote) => {
    let { id, subject, options } = vote;
    const $el = document.querySelector('.media-content-container');

    notification.config({
      getContainer: () => {
        return $el;
      },
    });

    notification.open({
      key: id,
      duration: 20,
      className: 'vote-notification',
      message: subject,
      description: (
        <Radio.Group>
          {options.map((opt) => {
            return (
              <Radio
                value={opt.value}
                onClick={() => {
                  notification.close(id);
                }}
              >
                {opt.value}
              </Radio>
            );
          })}
        </Radio.Group>
      ),
    });
  };

  /**
   * @title 발언권 신청
   * @description 스페이스바 누르면 Jitsi [RREQUEST_SAY] 커맨드 호출
   * @param {*} e 키 이벤트
   */
  const requestSayHandler = (e) => {
    const { code } = e;

    if (code !== 'Space') return;
    return jitsiManager.sendCommand(REQUEST_SAY, {
      value: localUserId,
      attributes: {
        name,
      },
    });
  };

  useEffect(() => {
    window.addEventListener('keypress', requestSayHandler);
    return () => {
      window.removeEventListener('keypress', requestSayHandler);
    };
    // eslint-disable-next-line
  }, []);

  //ANCHOR USER JOIN 이벤트 핸들러 바인딩/해제
  useEffect(() => {
    const userJoinEventHandler = (id, participant) => {
      if (isModeratorRef.current) {
        // shareConferenceInfo(id);
      }
    };

    jitsiManager._conference &&
      jitsiManager._conference.addEventListener(
        USER_JOINED,
        userJoinEventHandler
      );

    return () => {
      jitsiManager._conference &&
        jitsiManager._conference.removeEventListener(
          USER_JOINED,
          userJoinEventHandler
        );
    };
    // eslint-disable-next-line
  }, [isJoined, isModerator]);

  // ANCHOR 문서 정보 공유 커맨드 핸들러 바인딩 해제
  const shareDocumentFileHandler = ({ value, attributes }) => {
    if (localUserId !== value) return;
    console.log('FLAG : RECEIVE DOCUMENT INFO FROM MODER');
    dispatch(documentActions.setDocument(attributes));
    dispatch(documentActions.participantInitSheets(attributes));
  };

  const shareDrawingDataHandler = ({ value, attributes, children }) => {
    if (localUserId !== value) return;
    console.log('FLAG : RECEIVE DRAWING INFO FROM MODER');
    // dispatch(drawingActions.setSheets());
  };

  // ANCHOR 방장의 이미지 선택 이벤트 핸들러
  const moderatorSelectImageHandler = ({ value }) => {
    console.log('value: ', value);
    dispatch(documentActions.setModeratorActiveImage(value));
  };

  // ANCHOR 투표 활성화 커맨드 바인딩
  const handleBroadcastVote = (data) => {
    let newVote = {
      ...data.attributes,
      options: JSON.parse(data.attributes.options),
    };

    // if (localUserId !== data.value) {
    notifyVote(newVote);
    // }
  };

  //ANCHOR 시트 드로잉 커맨드 바인딩
  const handleDrawingToSheet = (data) => {
    console.log('Receive Drawing Signal');
    const { value, attributes } = data;
    const localUserId = jitsiManager._conference.myUserId();

    if (value !== localUserId) {
      const { sheetId, lastLine } = attributes;
      const parsedLine = JSON.parse(lastLine);

      dispatch(drawingActions.asyncInsertNewLine(sheetId, parsedLine));
    }
  };

  //ANCHOR 문서공유모드 변경 커맨드 바인딩
  const documentSharingChangeHanler = (values, sendUserId) => {
    if (jitsiManager._conference.myUserId() === sendUserId) return;
    const { attributes } = values;
    let newState = attributes.isSharing === 'true';

    dispatch(documentActions.setDocumentSharingMode(newState));
  };

  //ANCHOR 드로잉 탭 시트 추가 커맨드 바인딩
  const handleAddDrawingSheet = (data) => {
    const localUserId = jitsiManager._conference.myUserId();
    const { value, attributes } = data;

    if (value !== localUserId) {
      const { activeSheet } = initialState;
      const newSheet = {
        ...activeSheet,
        id: attributes.id,
      };

      dispatch(drawingActions.insertNewSheet(newSheet));
    }
  };

  //ANCHOR 발언권 핸들러
  const handleRequestSqy = (data) => {
    const {
      // value,
      attributes: { name },
    } = data;

    // if (value !== localUserId) {
    MessageAlert.success(`${name}님이 발언권을 신청했습니다. ✋🏻`);
    // }
  };

  if (jitsiManager._conference) {
    JitsiCommandHooks(SHARE_DOCUMENT_FILE, shareDocumentFileHandler);
    JitsiCommandHooks(SHARE_DRAWING_DATA, shareDrawingDataHandler);
    JitsiCommandHooks(MODERATOR_SELECT_IMAGE, moderatorSelectImageHandler);
    JitsiCommandHooks(BROADCAST_VOTE, handleBroadcastVote);
    JitsiCommandHooks(DRAWING_TO_SHEET, handleDrawingToSheet);
    JitsiCommandHooks(DOCUMENT_SHARING_CHANGE, documentSharingChangeHanler);
    JitsiCommandHooks(ADD_DRAWING_SHEET, handleAddDrawingSheet);
    JitsiCommandHooks(REQUEST_SAY, handleRequestSqy);
  }

  /* Render */
  return <ConferencePresenter isInvited={isInvited} />;
};

export default ConferenceContainer;
