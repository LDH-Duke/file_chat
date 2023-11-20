/**
 *
 */

import {
  CaretRightOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import MDEditor from '@uiw/react-md-editor';
import { Button, Card, Divider, Empty, Space, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Countdown from 'antd/lib/statistic/Countdown';
import { LCConferenceApi } from 'api';
import { Content, Row, Col } from 'layout';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { HOST_URL, MessageAlert, TypeManager } from 'utils';

const { Paragraph } = Typography;

/**
 * 라이브 상세
 * --
 */
const ConferenceDetail = () => {
  /* Router */
  const { conference_id } = useParams();
  const history = useHistory();

  /* State */
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [conference, setConference] = useState(undefined);
  const [otherConference, setOtherConference] = useState([]);
  const [participant, setParticipant] = useState([]);
  const [assets, setAssets] = useState([]);
  const [survey, setSurvey] = useState([]);
  const [toggle, setToggle] = useState(false);

  const [descEditable, setDescEditable] = useState(false);
  const [descVal, setDescVal] = useState(undefined);

  /* Hooks */
  useEffect(() => {
    getConference();
    // eslint-disable-next-line
  }, [conference_id]);

  /* Functions */
  /**
   * 컨퍼런스 상세 정보 불러오기
   * --
   */
  const getConference = async () => {
    const result = await LCConferenceApi.getConferenceDetail(conference_id);
    if (result) {
      const { conference, assets, survey, participant, others } = result;
      setConference(conference);
      setOtherConference(others);
      setParticipant(participant);
      setAssets(assets);
      setSurvey(survey);
      setToggle(true);
      return;
    }
  };

  /**
   * 컨퍼런스 참여
   * --
   * @returns
   */
  const handleParticipant = async () => {
    if (!userInfo) {
      MessageAlert.warning('로그인 후 참가할 수 있습니다.');
      return;
    }
    const { user_id } = userInfo;
    const postData = {
      conference_id,
      user_id,
    };
    const result = await LCConferenceApi.participantConference(postData);
    if (result) {
      MessageAlert.success('컨퍼런스 참여 성공');
      await getConference();
      return true;
    }
    return false;
  };

  /**
   * 컨퍼런스 일정 취소하기
   * --
   */
  const deleteConference = async () => {
    const result = await LCConferenceApi.deleteConference({ conference_id });
    if (result) {
      MessageAlert.success('일정이 취소되었습니다.');
      history.push('/groups');
      return true;
    }
    MessageAlert.error('일정을 취소할 수 없습니다.');
    return false;
  };

  /**
   * 컨퍼런스 수정
   * @param {*} key
   * @param {*} value
   * @returns
   */
  const handleUpdateConference = async (key, value) => {
    if (conference[key] === value) {
      return;
    }
    const postData = {
      ...conference,
      [key]: value,
    };
    const result = await LCConferenceApi.updateConference(postData);
    if (result) {
      await getConference();
      MessageAlert.success('수정 완료!');
      return;
    }
  };

  /**
   * 컨퍼런스 세부사항 토글/저장
   * --
   * @returns
   */
  // eslint-disable-next-line
  const handleDescEditable = async () => {
    if (!descEditable) {
      setDescVal(conference.conference_desc);
      setDescEditable(true);
      return;
    }

    if (descVal === conference.conference_desc) {
      setDescVal(undefined);
      setDescEditable(false);
      return;
    }

    await handleUpdateConference('conference_desc', descVal);
    setDescEditable(false);
  };

  /**
   * 참여자 필터링
   */
  const partToggle =
    userInfo &&
    participant.filter((item) => item.user_id === userInfo.user_id)[0];

  /* RENDER */
  return toggle ? (
    <>
      <Content maxWidth={'100%'}>
        <Card
          bordered
          bodyStyle={{
            width: 960,
            margin: '0 auto',
            paddingLeft: 7,
            paddingRight: 7,
          }}
        >
          <Content
            maxWidth={960}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <div style={{ width: '100%', padding: '10px 0' }}>
              <div
                style={{
                  fontSize: '1em',
                  color: '#8f8f8f',
                  fontWeight: 'bold',
                  fontFamily: 'NanumGothic',
                  cursor: 'pointer',
                }}
              >
                {conference.group_nm}
              </div>
              {/* <h2>{moment(conference.conference_date * 1000).format('lll')}</h2> */}
              <div
                style={{
                  fontSize: '2em',
                  fontWeight: '800',
                  lineHeight: 1,
                  fontFamily: 'NanumGothic',
                }}
              >
                <Paragraph
                  // editable={
                  //   partToggle &&
                  //   conference.user_id === userInfo.user_id && {
                  //     onChange: (v) =>
                  //       handleUpdateConference('conference_nm', v),
                  //     maxLength: 50,
                  //     autoSize: { maxRows: 5, minRows: 3 },
                  //   }
                  // }
                  style={{
                    lineHeight: 1,
                    fontFamily: 'NanumGothic',
                  }}
                >
                  {conference.conference_nm}
                </Paragraph>
              </div>
              <p
                style={{ fontSize: '1.05em', color: '#4e4e4e', lineHeight: 1 }}
              >
                <Space align="baseline">
                  {moment(conference.conference_date * 1000).format('lll')}

                  <Divider type="vertical" />
                  <span>
                    {conference.conference_scope ? (
                      <>
                        <EyeOutlined /> 공개
                      </>
                    ) : (
                      <>
                        <EyeInvisibleOutlined />
                        비공개
                      </>
                    )}
                    컨퍼런스
                  </span>
                  <Divider type="vertical" />
                  <span>
                    {
                      TypeManager.getConferenceType(conference.conference_type)
                        .icon
                    }{' '}
                    {
                      TypeManager.getConferenceType(conference.conference_type)
                        .value
                    }
                  </span>
                </Space>
              </p>
            </div>
            <div
              style={{
                width: '100%',
                padding: '15px 0 5px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
              }}
            >
              <div
                style={{
                  width: '70%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <Avatar size={32} src={conference.user_id}>
                  {conference.user_nm.slice(0, 1)}
                </Avatar>
                <div style={{ margin: '0 0.5vw' }}>
                  <div
                    style={{
                      fontSize: '1.2em',
                      fontWeight: 'bold',
                      lineHeight: 1,
                    }}
                  >
                    {conference.user_nm}
                  </div>
                  <div
                    style={{
                      fontSize: '0.95em',
                      lineHeight: 1,
                    }}
                  >
                    {conference.group_nm}
                  </div>
                </div>
              </div>

              {/*  */}
              <div
                style={{
                  width: '30%',
                  // textAlign: 'right',
                }}
                icon={<CaretRightOutlined />}
              >
                <Countdown
                  title={
                    <>
                      <span style={{ fontWeight: 'bold' }}>라이브까지</span>
                    </>
                  }
                  value={moment(conference.conference_date * 1000)}
                  format="D일 H시간 m분 남음"
                />
                {moment(conference.conference_date * 1000).isBefore(
                  moment()
                ) ? (
                  <>
                    <Button
                      size="large"
                      type="default"
                      icon={<ShareAltOutlined />}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${HOST_URL}/broadcast?room=${conference_id}`
                        );
                      }}
                    >
                      공유하기
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      size="large"
                      type="primary"
                      icon={<CaretRightOutlined />}
                      onClick={() => {
                        history.push(`/broadcast?room=${conference_id}`);
                      }}
                      danger
                    >
                      라이브!
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="large"
                      type="primary"
                      icon={<CaretRightOutlined />}
                      onClick={handleParticipant}
                      disabled={partToggle}
                    >
                      참가하기
                    </Button>
                    {userInfo && userInfo.user_id === conference.user_id && (
                      <>
                        &nbsp;&nbsp;
                        <Button
                          size="large"
                          type="default"
                          icon={<ShareAltOutlined />}
                        >
                          초대하기
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </Content>
        </Card>
      </Content>

      <Content maxWidth={960}>
        <Row>
          <Col x={17}>
            <h3
              style={{
                fontWeight: '900',
                color: '#4e4e4e',
                marginTop: 15,
              }}
            >
              세부사항
              {/* {partToggle && conference.user_id === userInfo.user_id && (
                <Button
                  size="small"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#1890ff',
                  }}
                  onClick={handleDescEditable}
                >
                  {descEditable ? (
                    '완료'
                  ) : (
                    <EditOutlined
                      style={{ color: '#1890ff', cursor: 'pointer' }}
                    />
                  )}
                </Button>
              )} */}
            </h3>
            <div>
              <MDEditor.Markdown
                source={descEditable ? descVal : conference.conference_desc}
              />
              <Divider />
              {/* {descEditable ? (
                <MDEditor
                  preview="edit"
                  value={descVal}
                  onChange={setDescVal}
                />
              ) : (
                ''
              )} */}
            </div>

            <h3
              style={{
                fontWeight: '900',
                color: '#4e4e4e',
                marginTop: 45,
              }}
            >
              참석자 <small>({participant.length})</small>
            </h3>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              {participant.map((item) => {
                const { group_nm, user_id, user_nm } = item;
                return (
                  <Card
                    key={user_id}
                    bordered
                    style={{ marginRight: '0.5vw' }}
                    bodyStyle={{
                      padding: '12px 30px',
                      textAlign: 'center',
                    }}
                  >
                    <Avatar size={48} src={user_id}>
                      {user_nm.slice(0, 1)}
                    </Avatar>
                    <h3
                      style={{
                        fontSize: '1.25em',
                        textAlign: 'center',
                        lineHeight: 1.25,
                        marginTop: 10,
                        marginBottom: 0,
                      }}
                    >
                      {user_nm}
                      <br />
                      <small style={{ fontSize: '0.75em' }}>{group_nm}</small>
                    </h3>
                  </Card>
                );
              })}
            </div>
            <Divider />

            <h3
              style={{
                fontWeight: '900',
                color: '#4e4e4e',
                marginTop: 15,
              }}
            >
              첨부파일
            </h3>
            <div>
              {assets.map((item) => {
                // eslint-disable-next-line
                const { assets_id, assets_nm, assets_type } = item;
                return (
                  <div key={assets_id}>
                    <Card
                      style={{ padding: 0 }}
                      bodyStyle={{ fontSize: '1.2rem' }}
                    >
                      {/* {icon} */}
                      {/* <FilePdfOutlined style={{ fontSize: '1.5rem' }} /> */}
                      {assets_nm}
                    </Card>
                  </div>
                );
              })}
            </div>
            <Divider />

            <h3
              style={{
                fontWeight: '900',
                color: '#4e4e4e',
                marginTop: 15,
              }}
            >
              질문/설문 목록
            </h3>
            <div>
              {/* <pre style={{ fontSize: '0.65vw' }}> */}
              {survey.map((item) => {
                const { survey_id, title, replys } = item;
                return (
                  <div key={survey_id}>
                    <Card
                      title={title}
                      style={{ padding: 0 }}
                      bodyStyle={{
                        fontSize: '1rem',
                        lineHeight: '1',
                        paddingTop: '1rem',
                        paddingBottom: '0',
                      }}
                    >
                      {replys.map((reply, idx) => {
                        const { id, value } = reply;
                        return (
                          <p key={id}>
                            {idx + 1}. {value}
                          </p>
                        );
                      })}
                      <p></p>
                    </Card>
                  </div>
                );
              })}
              {/* </pre> */}
            </div>
          </Col>
          <Col x={7}>
            <h3
              style={{
                fontWeight: '900',
                color: '#4e4e4e',
                marginTop: 15,
              }}
            >
              그룹정보
            </h3>
            <Card bordered style={{ width: '100%' }}>
              <div style={{ fontWeight: 'bold', padding: '0 0 1vh 0' }}>
                {conference.group_nm}
              </div>
              <div>{conference.group_desc}</div>
            </Card>
            <h3
              style={{
                fontWeight: '900',
                color: '#4e4e4e',
                marginTop: 15,
              }}
            >
              그룹의 다른 컨퍼런스
            </h3>
            <Card bordered bodyStyle={{}}>
              {otherConference.map((item) => {
                const { conference_id, conference_nm, user_id, user_nm } = item;
                return (
                  <div
                    key={conference_id}
                    style={{
                      borderBottom: '1px solid lightgray',
                      padding: '0 0 1vh 0',
                      marginBottom: '1.5vh',
                      cursor: 'pointer',
                    }}
                    onClick={() => history.push(`/conference/${conference_id}`)}
                  >
                    <div style={{ fontWeight: 'bold' }}>{conference_nm}</div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar size={28} src={user_id}>
                        {user_nm.slice(0, 1)}
                      </Avatar>
                      <div style={{ marginLeft: '0.25vw' }}>
                        <div
                          style={{
                            fontWeight: 'bold',
                            lineHeight: 1,
                          }}
                        >
                          {user_nm}
                        </div>
                        {/* <div
                          style={{
                            lineHeight: 1,
                          }}
                        >
                          {group_nm}
                        </div> */}
                      </div>
                    </div>
                  </div>
                );
              })}
              {otherConference.length === 0 ? (
                <Empty description="일정이 없습니다." />
              ) : (
                <Link
                  to={`/groups/${conference.group_id}`}
                  style={{
                    display: 'block',
                    margin: '0 auto',
                    textAlign: 'center',
                    textDecoration: 'underline',
                  }}
                >
                  전체보기
                </Link>
              )}
            </Card>

            {userInfo && userInfo.user_id === conference.user_id && (
              <Space
                direction="vertical"
                style={{
                  width: '100%',
                  fontWeight: '900',
                  color: '#4e4e4e',
                  marginTop: 15,
                }}
              >
                <Button
                  block
                  size="large"
                  type="primary"
                  onClick={() =>
                    history.push(
                      `/modify/conference?conference_id=${conference_id}`
                    )
                  }
                >
                  일정 수정하기
                </Button>
                <Button block size="large" danger onClick={deleteConference}>
                  일정 취소하기
                </Button>
              </Space>
            )}
          </Col>
        </Row>
      </Content>
    </>
  ) : (
    'Loading'
  );
};

ConferenceDetail.defaultProps = {
  live_desc: `This event is 100% online!
This event is organized by Albert's List and Highre.
Our meetup group is collaborating by promoting this event.
  
This event is FREE to attend for job seekers!
In order to attend, please register here:
...

Hurry!
Slots are limited!`,
};

export default ConferenceDetail;
