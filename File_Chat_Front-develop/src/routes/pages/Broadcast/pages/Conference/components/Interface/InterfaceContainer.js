import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { documentActions } from 'redux/module/document';
import { customCommand } from 'utils/jitsi/events/';
import JitsiManager from 'utils/jitsi/JitsiManager';
import InterfacePresenter from './InterfacePresenter';

const jitsiManager = new JitsiManager();
const { DOCUMENT_SHARING_CHANGE } = customCommand;

const InterfaceContainer = () => {
  const history = useHistory();
  const isSharing = useSelector((state) => state.document.isSharing);
  const isInvited = useSelector((state) => state.conference.isInvited);
  const videoTrack = useSelector((state) => state.localUser.videoTrack);
  const audioTrack = useSelector((state) => state.localUser.audioTrack);
  const [videoMute, setVideoMute] = useState(true);
  const [audioMute, setAudioMute] = useState(true);

  const dispatch = useDispatch();

  /**
   * @title
   */
  const handleLeaveConference = () => {
    if (jitsiManager._conference) {
      jitsiManager.leave();
    }

    // FIXME 초대된 사용자는 프로그램 배경화면으로
    if (isInvited) {
      history.push('/');
    } else {
      history.goBack();
    }
  };

  /**
   * @title 방장 문서 공유 모드 활성화
   * @description jitsi [DOCUMENT_SHARING_CHANGE] 커맨드 전송
   */
  const handleDocumentSharingMode = () => {
    jitsiManager.sendCommand(DOCUMENT_SHARING_CHANGE, {
      attributes: {
        isSharing: !isSharing,
      },
    });

    dispatch(documentActions.toggleDocumentSharingMode());
  };

  /**
   * @title 마이크 뮤트 처리
   */
  const handleMicMute = () => {
    if (audioTrack.isMuted()) {
      audioTrack.unmute();
      setAudioMute(false);
    } else {
      audioTrack.mute();
      setAudioMute(true);
    }
  };

  /**
   * @title 카메라 뮤트 처리
   */
  const handleCameraMute = () => {
    if (videoTrack.isMuted()) {
      videoTrack.unmute();
      setVideoMute(false);
    } else {
      videoTrack.mute();
      setVideoMute(true);
    }
  };

  return (
    <InterfacePresenter
      handleLeaveConference={handleLeaveConference}
      handleDocumentSharingMode={handleDocumentSharingMode}
      handleMicMute={handleMicMute}
      handleCameraMute={handleCameraMute}
      videoTrack={videoTrack}
      audioTrack={audioTrack}
      videoMute={videoMute}
      audioMute={audioMute}
    />
  );
};

export default InterfaceContainer;
