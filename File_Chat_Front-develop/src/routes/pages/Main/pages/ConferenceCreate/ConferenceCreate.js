/**
 *
 */

import { useEffect, useState } from 'react';
import { Content, Row, Col } from 'layout';
import { Card, Button, PageHeader } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import MessageAlert from 'utils/MessageAlert';
import { v4 } from 'uuid';
import './ConferenceCreate.css';
import moment from 'moment';
import { BroadcastInfo, ConferenceInfo, ParticipantsInfo } from './components';
import { LCConferenceApi, LCGroupApi } from 'api';
import { useDispatch, useSelector } from 'react-redux';
import { conferenceAction } from 'redux/module/conference';

const roomName = v4();

/**
 * 라이브 생성
 * --
 */

const ConferenceCreate = () => {
  /* Router */
  const { search } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [, group_id] = search.split('?group_id=');

  /* State */
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [data, setData] = useState({
    conference_type: 'conference',
    title: '',
    description: '',
    assets: [],
    survey: [],
  });
  // eslint-disable-next-line
  const [device, setDevice] = useState({
    audio: {},
    video: {},
  });
  const [audioDevice, setAudioDevice] = useState([]);
  const [videoDevice, setVideoDevice] = useState([]);
  const [conference, setConference] = useState({
    conference_nm: '',
    conference_date: '',
    conference_desc: '',
  });
  const [members, setMembers] = useState([]);
  const [participant, setParticipant] = useState([]);

  /* Hooks */
  /**
   * 사용자 디바이스 정보 가져오기
   * --
   * getDevice
   */
  useEffect(() => {
    getDevice();
    // eslint-disable-next-line
  }, []);

  /**
   * 그룹 멤버 목록 가져오기
   * --
   * getMemberList
   */
  useEffect(() => {
    getMemberList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userInfo) {
      setParticipant([{ user_id: userInfo.user_id, manager: true }]);
      return;
    }
    MessageAlert.warning('로그인 후 사용가능합니다.');
    history.push('/signin');
    // eslint-disable-next-line
  }, [userInfo]);

  /* Functions */

  /**
   * 장치 정보 가져오기
   * --
   */
  const getDevice = async () => {
    const enumeratorPromise = await navigator.mediaDevices.enumerateDevices();
    const audioInput = enumeratorPromise.filter((item) => {
      const { kind } = item;
      return kind === 'audioinput';
    });
    const video = enumeratorPromise.filter((item) => {
      const { kind } = item;
      return kind === 'videoinput';
    });
    setAudioDevice(audioInput);
    setVideoDevice(video);
  };

  /**
   * 방송참가
   * --
   */
  const handlerJoinConference = async () => {
    dispatch(conferenceAction.setInvite(false));
    history.push(`/broadcast?room=${roomName}`);
  };

  /**
   * ???
   * --
   */
  const handleChageData = (target, value) => {
    setData({ ...data, [target]: value });
  };

  /**
   * 멤버 리스트 가져오기
   * --
   */
  const getMemberList = async () => {
    const result = await LCGroupApi.getGroupMembers(group_id);
    if (result) {
      setMembers(result);
      return true;
    }
    MessageAlert.error(`그룹 정보 조회 실패: ${result}`);
  };

  /**
   * 컨퍼런스 생성
   * --
   * @returns
   */
  const handleConference = async () => {
    if (participant.length === 0) {
      MessageAlert.warning('멤버는 1명 이상이어야 합니다.');
      return;
    }

    const { conference_type, assets, survey } = data;
    // console.log(survey);
    const postData = {
      conference: {
        ...conference,
        conference_type,
        conference_date: moment(conference.conference_date).unix(),
        group_id,
      },
      participant,
      assets,
      survey,
    };
    const result = await LCConferenceApi.insertConference(postData);
    if (result) {
      const { conference_id } = result;
      MessageAlert.success('일정 등록이 완료되었습니다.');
      // history.push('/groups');
      history.push(`/conference/${conference_id}`);
      return true;
    }
    MessageAlert.error('일정 등록 실패, 다시 확인해주세요.');
    return false;
  };

  /* RENDER */
  return (
    <>
      {/* ===== ===== */}
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="라이브생성"
        style={{
          background: '#fff',
          boxShadow: '1px 2px 9px -6px rgba(0,0,0, 0.3)',
        }}
      />
      <br />

      {/* ===== ===== */}
      <Content maxWidth={1200}>
        <Row>
          <ConferenceInfo
            conference={conference}
            setConference={setConference}
            data={data}
            setData={setData}
            handleChageData={handleChageData}
          />
          {/* ===== 사이드 ===== */}
          <Col x={7} style={{ padding: 5 }}>
            <Card bodyStyle={{ padding: 0 }}>
              <ParticipantsInfo
                userInfo={userInfo}
                members={members}
                participant={participant}
                setParticipant={setParticipant}
              />
              {/* === === */}
              <BroadcastInfo
                audioDevice={audioDevice}
                videoDevice={videoDevice}
                setDevice={setDevice}
              />

              {/*  */}
              {group_id ? (
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleConference}
                >
                  일정 만들기
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handlerJoinConference}
                >
                  시작하기
                </Button>
              )}
            </Card>
          </Col>
        </Row>
        <br />
        <br />
      </Content>
    </>
  );
};

export default ConferenceCreate;
