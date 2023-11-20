/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button, Card, PageHeader, Space, Typography } from 'antd';
import { LCConferenceApi } from 'api';
import { Content, Row, Col } from 'layout';
import { useHistory, useLocation, useParams } from 'react-router';

const Conclusion = () => {
  /* Routers */
  const history = useHistory();
  // const { conference_id } = useParams();
  const { search } = useLocation();
  const [, conference_id] = search.split('?conference_id=');
  const [conference, setConference] = useState(undefined);
  const [participant, setParticipant] = useState([]);
  const [assets, setAssets] = useState([]);
  const [survey, setSurvey] = useState([]);

  /* Hooks */
  useEffect(() => {
    handleGetConclusion();
  }, []);

  /* Functions */
  const handleGetConclusion = async () => {
    const result = await LCConferenceApi.getConclusion(conference_id);
    if (result) {
      const { conference, participant, assets, survey } = result;
    }
  };

  const handleEndBroadcast = async () => {
    const conferenceInfo = {
      conference_id,
      conference_state: 'END',
    };
    const result = await LCConferenceApi.updateConferenceState(conferenceInfo);
    if (result) {
      history.push('/broadcash');
    }
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="방송종료"
        extra={
          <Button danger type="text" style={{ fontWeight: 'bold' }}>
            종료하기
          </Button>
        }
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
              <h1>방송이 종료되었습니다.</h1>
              <p>방송에서 사용된 자원입니다.</p>
            </div>
            <Card bordered>
              <Space direction="vertical">
                <Space size={30}>
                  <Typography.Title level={3}>기본 정보</Typography.Title>
                  <Typography.Paragraph>라이브정보</Typography.Paragraph>
                </Space>
                <Space size={30}>
                  <Typography.Title level={3}>참여 인원 </Typography.Title>
                  <Typography.Paragraph>참여인원</Typography.Paragraph>
                </Space>
                <Space size={30}>
                  <Typography.Title level={3}>첨부 파일 </Typography.Title>
                  <Typography.Paragraph>첨부파일</Typography.Paragraph>
                </Space>
                <Space size={30}>
                  <Typography.Title level={3}>질문/투표</Typography.Title>
                  <Typography.Paragraph>질문/투표</Typography.Paragraph>
                </Space>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Conclusion;
