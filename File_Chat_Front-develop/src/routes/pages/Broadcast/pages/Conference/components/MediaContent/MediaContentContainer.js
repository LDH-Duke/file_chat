import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaContentPresenter from './MediaContentPresenter';
import { drawingActions } from 'redux/module/drawing';
import JitsiManager from 'utils/jitsi/JitsiManager';
import { message } from 'antd';
import { documentActions } from 'redux/module/document';
import { JitsiCommandHooks } from 'components/Jitsi';

const jitsiManager = new JitsiManager();

const MediaContentContainer = () => {
  const localUser = useSelector((state) => state.localUser);
  const participants = useSelector((state) => state.participant.list);
  const documentSharingMode = useSelector((state) => state.document.isSharing);
  const activeSheet = useSelector((state) => state.drawing.activeSheet);
  const isDrawing = useSelector((state) => state.conference.isDrawing);
  const isConnected = useSelector((state) => state.conference.isConnected);
  const isJoined = useSelector((state) => state.conference.isJoined);
  const sharingDocumentList = useSelector(
    (state) => state.document.sharingDocumentList
  );

  const { id: localUserId, videoTrack } = localUser;
  const dispatch = useDispatch();

  /**
   * @title 문서 드로잉 시트 초기화
   * @description 문서 데이터 기반으로 드로잉 시트를 초기화 한다.
   */
  const initDocumentDrawingSheet = () => {
    dispatch(drawingActions.initSheets(sharingDocumentList));
  };

  /**
   * @title 회의 참가 핸들러
   * @description 회의 참가 처리
   */
  const handleJoinConference = async () => {
    initDocumentDrawingSheet();
  };

  // 회의 참가 핸들러
  useEffect(() => {
    if (isConnected && !isJoined) {
      handleJoinConference();
    }
    // eslint-disable-next-line
  }, [isConnected, isJoined]);

  // 트랙 추가 핸들러
  useEffect(() => {
    if (!isJoined) return;
    try {
      jitsiManager.newAddTrack(dispatch);
    } catch (error) {
      message.error(error);
    }
    // eslint-disable-next-line
  }, [isJoined]);

  // ANCHOR 드로잉 커맨드 리스너
  const drawingListener = (e) => {
    const { value, attributes } = e;
    if (value === localUserId) return;

    const { sheetId, lastLine } = attributes;
    const parsedLine = JSON.parse(lastLine);

    dispatch(drawingActions.asyncInsertNewLine(sheetId, parsedLine));
  };

  // ANCHOR 드로잉 커맨드 리스너
  const documentDrawingListener = (e) => {
    const { value, attributes } = e;
    if (value === localUserId) return;

    const { sheetId, lastLine } = attributes;
    const parsedLine = JSON.parse(lastLine);

    dispatch(documentActions.asyncInsertNewLine(sheetId, parsedLine));
  };

  JitsiCommandHooks('DRAWING', drawingListener);
  JitsiCommandHooks('DOCUMENT_DRAWING', documentDrawingListener);

  return (
    <MediaContentPresenter
      participants={participants}
      videoTrack={videoTrack}
      documentSharingMode={documentSharingMode}
      isDrawing={isDrawing}
      activeSheet={activeSheet}
    />
  );
};

export default MediaContentContainer;
