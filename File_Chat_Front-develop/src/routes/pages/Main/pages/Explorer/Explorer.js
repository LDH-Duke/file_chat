/**
 *
 */

import { useEffect, useState } from 'react';
import { Content, Row, Col } from 'layout';
import {
  Card,
  PageHeader,
  Button,
  Empty,
  Skeleton,
  Divider,
  // Avatar,
  // Form,
  // Input,
  // Select,
} from 'antd';
import { Line } from 'components';
import { useSelector } from 'react-redux';
import { MessageAlert, getCookie } from 'utils';
import { API } from 'api';

const { Meta } = Card;

// const { Option } = Select;

/**
 * [Component] 그룹목록
 * --
 */
const Explorer = (props) => {
  /* ===== State ===== */
  // const [groups, setGroups] = useState([]);
  // const [conference, setConference] = useState([]);
  // const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [invites, setInvites] = useState([]);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const userId = getCookie('userId');

  /* ===== Functions ===== */
  /**
   * 검색함수
   * --
   */
  // const handleSearch = async () => {
  //   console.log('handleSearch');
  // };

  /**
   * 수락함수
   * --
   */
  const handleAccess = async (id) => {
    try {
      const { status } = await API.inviteAccess(id, { invite_access: 1 });
      if (status !== 200) {
        return MessageAlert.error(
          '초대를 수락할 수 없습니다. 다시 시도해주세요'
        );
      }
      const fid = invites.findIndex((i) => i.invite_id === id);

      setInvites([
        ...invites.slice(0, fid),
        {
          ...invites[fid],
          invite_access: true,
        },
        ...invites.slice(fid + 1),
      ]);
      MessageAlert.success('승인되었습니다.');
    } catch (err) {
      return MessageAlert.error('초대를 수락할 수 없습니다. 다시 시도해주세요');
    }
  };

  const handleLeaveRoom = async (room_id) => {
    try {
      const response = await API.leaveRoom(room_id);

      window.location.href = '/messenger';
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /* ===== Hooks ===== */
  /**
   * 초대목록 조회
   * --
   */
  useEffect(() => {
    const call = async () => {
      try {
        const { status, data } = await API.getInvites(userId);
        if (status !== 200) {
          return MessageAlert.error('데이터를 불러올 수 없습니다.');
        }
        setInvites(data);
      } catch (err) {
        MessageAlert.error('X');
      }
    };

    call();
  }, []);

  /* ===== Variables ===== */
  const inList = invites.filter((i) => i.invite_access === false);
  const myList = invites.filter((i) => i.invite_access === true);

  /* ===== Render ===== */
  return userInfo ? (
    <>
      <br />

      {/* === 검색 === */}
      {/* <Content maxWidth="100%">
        <Content>
          <PageHeader
            className="site-page-header"
            title="검색"
            style={{ margin: 0, padding: 0 }}
          />

          <Form
            onFinish={handleSearch}
            name="customized_form_controls"
            layout="inline"
          >
            <Form.Item>
              <Select size="large" style={{ width: 100 }} placeholder="분류">
                <Option value="all">전체</Option>
                <Option value="1">~~</Option>
                <Option value="2">(())</Option>
              </Select>{' '}
              <Input
                type="text"
                name="keyword"
                size="large"
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: 250 }}
              />{' '}
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                style={{ width: 85 }}
              >
                검색
              </Button>
            </Form.Item>
          </Form>
          <br />
        </Content>
      </Content>
      <br /> */}

      {/* === 초대목록 === */}
      <Content>
        <Row>
          <Col x={24}>
            <PageHeader
              className="site-page-header"
              title="초대목록"
              style={{ margin: 0, padding: 0 }}
            />
          </Col>

          {loading === true ? (
            <h1>Loading...</h1>
          ) : (
            inList.length > 0 &&
            inList.map((item) => {
              return (
                <Col
                  x={6}
                  style={{ padding: 5 }}
                  key={`inList_${item.invite_id}`}
                >
                  <Card style={{ minHeight: 158 }} hoverable>
                    <Meta
                      title={item.room.room_name}
                      description={item.room.room_description}
                    />
                    <Line />
                    <Button
                      block
                      type="primary"
                      onClick={() => handleAccess(item.invite_id)}
                    >
                      수락
                    </Button>
                  </Card>
                </Col>
              );
            })
          )}
          {inList.length === 0 && (
            <Empty className="w-100" description="신규 채팅이 없습니다." />
          )}
        </Row>
      </Content>
      <br />
      <br />
      <br />

      <Content>
        <Row>
          <Col x={24}>
            <PageHeader
              className="site-page-header"
              title="가입목록"
              style={{ margin: 0, padding: 0 }}
            />
          </Col>

          {loading === true ? (
            <h1>Loading...</h1>
          ) : (
            myList.length > 0 &&
            myList.map((item) => (
              <Col
                x={6}
                style={{ padding: 5 }}
                key={`myList_${item.invite_id}`}
              >
                <Card style={{ minHeight: 158 }} hoverable>
                  <Meta
                    title={item.room.room_name}
                    description={item.room.room_description}
                  />
                  <Line />
                  <Button block danger onClick={()=>handleLeaveRoom(item.room.room_id)}>
                    나가기
                  </Button>
                </Card>
              </Col>
            ))
          )}
          {myList.length === 0 && (
            <Empty className="w-100" description="가입된 목록이 없습니다." />
          )}
          <br />
          <br />
          <br />
        </Row>
      </Content>
    </>
  ) : (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '1vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Skeleton.Input
        active={true}
        size="large"
        style={{ width: 780, height: '50px' }}
      />
      <Divider />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {[...new Array(20)].map((item) => {
          return (
            <Skeleton.Button
              active={true}
              style={{ width: 400, height: 200, margin: '1vw' }}
              size="large"
              shape="round"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Explorer;
