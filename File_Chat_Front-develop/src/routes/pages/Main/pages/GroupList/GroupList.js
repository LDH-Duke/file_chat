/**
 *
 */

import { useEffect, useState } from 'react';
import { Content, Row, Col } from 'layout';
import {
  Card,
  PageHeader,
  Form,
  Input,
  Select,
  Button,
  Empty,
  Divider,
} from 'antd';
import { Link } from 'react-router-dom';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { LCGroupApi } from 'api';
import { useSelector } from 'react-redux';
import { GroupCard } from './components';
const { Option } = Select;

/**
 * 그룹목록
 * --
 */
const GroupList = (props) => {
  /* State */
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [myGroups, setMyGroups] = useState([]);
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  /* Hooks */
  useEffect(() => {
    getGroupList();
    getMyGroupList();
    // eslint-disable-next-line
  }, [userInfo]);

  /* Functions */
  /**
   * 그룹 목록 불러오기
   * --
   */
  const getGroupList = async () => {
    const result = await LCGroupApi.getGroupList();
    if (result) {
      setGroups(result);
    }
    setLoading(false);
  };

  /**
   * 가입한 그룹 목록 불러오기
   * --
   * @returns
   */
  const getMyGroupList = async () => {
    if (userInfo) {
      const result = await LCGroupApi.getMyGroupList(userInfo.user_id);
      if (result) {
        setMyGroups(result);
      }
      return true;
    }
    return false;
  };

  /* RENDER */
  return (
    <>
      <Content maxWidth="100%">
        <Card>
          <Content>
            <PageHeader
              className="site-page-header"
              title="검색"
              style={{ margin: 0, padding: 0 }}
            />

            <Form
              name="customized_form_controls"
              layout="inline"
              initialValues={{
                price: {
                  number: 0,
                  currency: 'rmb',
                },
              }}
            >
              <Form.Item>
                <Select size="large" style={{ width: 100 }} placeholder="분류">
                  <Option value="all">전체</Option>
                  <Option value="1">~~</Option>
                  <Option value="2">(())</Option>
                </Select>{' '}
                <Input
                  type="text"
                  size="large"
                  style={{ width: 250 }}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
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
        </Card>
      </Content>
      <br />

      <Content>
        <Row>
          {userInfo && (
            <>
              <Col x={24}>
                <Divider plain orientation="left">
                  <PageHeader
                    className="site-page-header"
                    title="내가 가입한 그룹 목록"
                    style={{ margin: 0, padding: 0 }}
                  />
                </Divider>
              </Col>
              {myGroups.map((group) => {
                const { group_id } = group;
                return (
                  <Col key={group_id} x={6} style={{ padding: 5 }}>
                    <GroupCard {...group} />
                  </Col>
                );
              })}
              {myGroups.length === 0 && (
                <div style={{ width: '100%' }}>
                  <Empty description="가입한 그룹이 없습니다." />
                </div>
              )}
            </>
          )}

          <Col x={24}>
            <Divider plain orientation="left">
              <PageHeader
                className="site-page-header"
                title="라이브콘의 전체 그룹 목록"
                style={{ margin: 0, padding: 0 }}
              />
            </Divider>
          </Col>

          {loading === true ? (
            <h1>Loading...</h1>
          ) : groups.length > 0 ? (
            groups.map((group) => {
              const { group_id } = group;

              // const sn = group_manager.slice(1);
              return (
                <Col key={group_id} x={6} style={{ padding: 5 }}>
                  <GroupCard {...group} />
                </Col>
              );
            })
          ) : (
            <div style={{ width: '100%' }}>
              <Empty description="그룹이 없습니다." />
            </div>
          )}
        </Row>
      </Content>

      {userInfo && (
        <div style={{ position: 'fixed', zIndex: 999, right: 70, bottom: 40 }}>
          <Link to={`/create/group`}>
            <Button
              type="primary"
              shape="round"
              size="large"
              className="shadow"
              icon={<AppstoreAddOutlined />}
              style={{ padding: '15px 30px', height: 58 }}
            >
              그룹생성
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default GroupList;
