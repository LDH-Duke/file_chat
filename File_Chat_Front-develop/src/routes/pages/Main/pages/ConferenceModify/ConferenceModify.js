/* eslint-disable */
import { Button, Card, PageHeader, Space } from 'antd';
import { LCConferenceApi, LCUserApi } from 'api';
import { Col, Content, Row } from 'layout';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import {
  AssetsModify,
  BroadcastModify,
  ParticipantModify,
  SurveyModify,
} from './components';

const ConferenceModify = () => {
  /* Routers */
  const { search } = useLocation();
  const [, conference_id] = search.split('?conference_id=');

  /* State */
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [conference, setConference] = useState(undefined);
  const [participant, setParticipant] = useState([]);
  const [assets, setAssets] = useState([]);
  const [survey, setSurvey] = useState([]);
  const [members, setMembers] = useState([]);

  const [addParticipant, setAddParticipant] = useState([]);
  const [removeParticipant, setRemoveParticipant] = useState([]);
  const [displayParticipant, setDisplayParticipant] = useState([]);

  const [addAssets, setAddAssets] = useState([]);
  const [removeAssets, setRemoveAssets] = useState([]);

  const [addSurvey, setAddSurvey] = useState([]);
  const [removeSurvey, setRemoveSurvey] = useState([]);

  /* Hooks */
  useEffect(() => {
    handleConferenceData();
    handleConferenceMembers();
    // eslint-disable-next-line
  }, []);

  /* Functions */
  /**
   * 컨퍼런스 정보 불러오기
   * --
   */
  const handleConferenceData = async () => {
    const result = await LCConferenceApi.getConferenceDetail(conference_id);
    if (result) {
      const { conference, participant, assets, survey } = result;
      setConference(conference);
      setParticipant(participant);
      setDisplayParticipant(participant);
      setAssets(assets);
      setSurvey(survey);
    }
  };

  /**
   * 유저리스트 불러오기
   * --
   */
  const handleConferenceMembers = async () => {
    const result = await LCUserApi.getUserList();
    if (result) {
      setMembers(result);
    }
  };

  /**
   * 참여인원 수정
   * @param {*} val
   */
  const handleParticipant = async (val, type = false) => {
    let temp;
    if (!type) {
      const checked = addParticipant.filter((o) => o.user_id === val);
      const add = addParticipant.filter((o) => o.user_id !== val);
      // eslint-disable-next-line
      temp = displayParticipant.filter((item) => {
        if (checked.length !== 0) {
          setAddParticipant(add);
        } else {
          setRemoveParticipant([...removeParticipant, item]);
        }
        return item.user_id !== val;
      });
    } else {
      const remove = removeParticipant.filter((o) => o.user_id !== val.user_id);
      const partChecked = participant.filter((o) => o.user_id === val.user_id);
      if (partChecked.length !== 0) {
        temp = [...displayParticipant, val];
        setRemoveParticipant(remove);
      } else {
        temp = [...displayParticipant, val];
        setAddParticipant([...addParticipant, val]);
      }
    }
    setDisplayParticipant(temp);
  };

  /**
   * 컨퍼런스 정보 수정 핸들러
   * --
   * @param {*} key
   * @param {*} value
   */
  const onChangeConference = (key, value) => {
    setConference({ ...conference, [key]: value });
  };

  // const onAsset;

  return conference ? (
    <>
      <PageHeader
        className="site-page-header"
        title="방송 정보 수정"
        extra={[
          <Button danger type="text" style={{ fontWeight: 'bold' }} key={1}>
            수정 취소
          </Button>,
          <Button type="link" style={{ fontWeight: 'bold' }} key={2}>
            수정 완료
          </Button>,
        ]}
        style={{
          background: '#fff',
          boxShadow: '1px 2px 9px -6px rgba(0,0,0, 0.3)',
        }}
      />
      <br />

      {/* ===== ===== */}
      <Content maxWidth={1200}>
        <Row>
          <Col x={24}>
            <div>
              <h1>방송정보를 수정합니다.</h1>
              <p>방송에서 사용될 자원입니다.</p>
            </div>
            <Card bordered>
              <Space direction="vertical" className="w-100 h-100">
                <BroadcastModify
                  {...conference}
                  onChangeConference={onChangeConference}
                />
                <ParticipantModify
                  userInfo={userInfo}
                  members={members}
                  participant={displayParticipant}
                  handleParticipant={handleParticipant}
                />
                <AssetsModify assets={assets} setAssets={setAssets} />
                <SurveyModify survey={survey} setSurvey={setSurvey} />
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  ) : (
    ''
  );
};

export default ConferenceModify;
