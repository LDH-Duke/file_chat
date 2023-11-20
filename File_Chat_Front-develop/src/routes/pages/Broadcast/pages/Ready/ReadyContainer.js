import React, { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { conferenceAction } from 'redux/module/conference';
import { localUserActions } from 'redux/module/localUser';
import { connectionEvents } from 'utils/jitsi/events';
import JitsiManager from 'utils/jitsi/JitsiManager';
import ReadyPresenter from './ReadyPresenter';

const jitsiManager = new JitsiManager();

const ReadyContainer = () => {
  /* Router */
  let history = useHistory();
  const { search } = useLocation();
  const [, conference_id] = search.split('?room=');

  /* State */
  const isModerator = useSelector((state) => state.localUser.isModerator);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioInputDevices, setAudioInputDevices] = useState([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  const dispatch = useDispatch();

  /* Hooks */

  useEffect(() => {
    initJitsiClient();
    return () => {};
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMediaDeviceList();
    // eslint-disable-next-line
  }, []);

  /* Functions */

  /**
   * @title Jitsi 객체 초기화
   */
  const initJitsiClient = () => {
    jitsiManager.init(dispatch, history, [
      {
        event: connectionEvents.CONNECTION_ESTABLISHED,
        handler: function () {
          // MessageAlert.success('Jitsi Init');
          jitsiManager.initConference(dispatch, history, conference_id, []);
        },
      },
    ]);
  };

  /**
   * @title 유저 미디어 디바이스 목록 가져오기
   */
  const getMediaDeviceList = async () => {
    let deviceList = await navigator.mediaDevices.enumerateDevices();
    let audioInput = [],
      audioOutput = [],
      video = [];

    for (let i = 0; i < deviceList.length; i++) {
      const device = deviceList[i];

      if (device.kind === 'audioinput') {
        audioInput.push(device);
      } else if (device.kind === 'videoinput') {
        video.push(device);
      } else if (device.kind === 'audiooutput') {
        audioOutput.push(device);
      }
    }

    setVideoDevices(video);
    setAudioInputDevices(audioInput);
    setAudioOutputDevices(audioOutput);
  };

  /**
   * @title 방 참가 처리 함수
   * @param {*} username 유저 이름
   */
  const handleJoinConference = async (username) => {
    jitsiManager.join(username);

    // 유저 정보 갱신
    batch(() => {
      dispatch(conferenceAction.setInvite(false));

      dispatch(
        localUserActions.setLocalUserInfo({
          id: jitsiManager._conference.myUserId(),
          username,
          isModerator,
        })
      );
    });

    history.push(`/broadcast/live?room=${conference_id}`);
  };

  /* Render */
  return (
    <ReadyPresenter
      videoDevices={videoDevices}
      audioInputDevices={audioInputDevices}
      audioOutputDevices={audioOutputDevices}
      handleJoinConference={handleJoinConference}
    />
  );
};

export default ReadyContainer;
