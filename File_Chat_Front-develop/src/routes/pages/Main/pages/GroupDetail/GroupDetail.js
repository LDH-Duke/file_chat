/**
 *
 */

import { useEffect, useState } from 'react';
import { Content, Row, Col } from 'layout';
import {
  Card,
  Avatar,
  PageHeader,
  Calendar,
  Button,
  Space,
  Badge,
  Empty,
  Popconfirm,
} from 'antd';
import { ScheduleItem } from 'components';
import MessageAlert from 'utils/MessageAlert';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  TeamOutlined,
  LinkOutlined,
  UserAddOutlined,
  LeftOutlined,
  RightOutlined,
  VideoCameraAddOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { LCGroupApi } from 'api';
import { useSelector } from 'react-redux';

/**
 * 그룹 상세
 * --
 */
const GroupDetail = () => {
  /* Router */
  const { group_id } = useParams();
  const history = useHistory();

  /* State */
  const [calendarDate, setCalendarDate] = useState(moment());
  const [group, setGroup] = useState(undefined);
  const [schedule, setSchedule] = useState([]);
  const [members, setMembers] = useState([]);
  const [filterSchedule, setFilterSchedule] = useState([]);
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  /* Hooks */
  useEffect(() => {
    handleGroupDetail();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    scheduleFilter(calendarDate);
    // eslint-disable-next-line
  }, [calendarDate, schedule]);

  /* Functions */
  /**
   * 그룹 상세 정보 가져오기
   * --
   */
  const handleGroupDetail = async () => {
    const result = await LCGroupApi.getGroupDetail(group_id);
    if (result) {
      const { groups, memberList, conferenceList } = result;
      setGroup(groups);
      setMembers(memberList);
      setSchedule(conferenceList);
      return;
    }
  };

  /**
   * 날짜 정보 변경
   * --
   */
  const onChangeDate = (val, direction) => {
    if (val) {
      setCalendarDate(val);
      return;
    }

    if (direction === 'prev') {
      setCalendarDate(moment(calendarDate).subtract(1, 'months'));
    } else {
      setCalendarDate(moment(calendarDate).add(1, 'months'));
    }
  };

  /**
   * 컨퍼런스 마크를 위한 새로운 배열 생성
   * --
   */
  const onCheckSchedule = (val) => {
    const [checked] = schedule.filter((item) => {
      const { schedule_date } = item;
      return (
        moment(val).format('yyyy-MM-DD') ===
        moment(schedule_date).format('yyyy-MM-DD')
      );
    });
    return checked;
  };

  /**
   * 컨퍼런스 일정 마크
   * --
   */
  const calData = (val) => {
    const temp = onCheckSchedule(val);
    if (temp) {
      return <Badge dot />;
    } else {
      return <Badge dot={false} />;
    }
  };

  /**
   * 스케쥴 필터링
   * --
   */
  const scheduleFilter = (filterDate) => {
    const temp = schedule.filter((item) => {
      const { schedule_date } = item;
      return moment(schedule_date).isSameOrAfter(
        moment(filterDate).format('YYYY-MM-DD')
      );
    });
    setFilterSchedule(temp);
  };

  /**
   * 그룹참여
   * --
   */
  const handleJoinGroup = async () => {
    if (!userInfo) {
      MessageAlert.warning('로그인 후 시도해주세요.');
      history.push('/signin');
      return false;
    }
    const { user_id } = userInfo;
    const postData = {
      group_id,
      user_id,
    };
    const result = await LCGroupApi.joinGroup(postData);
    if (result) {
      MessageAlert.success('그룹 가입에 성공했습니다.');
      await handleGroupDetail();
      return true;
    }
    MessageAlert.error('그룹 가입 실패');
  };

  /**
   * 그룹 삭제
   * --
   * @returns
   */
  const handleDeleteGroup = async () => {
    const result = await LCGroupApi.deleteGroup({ group_id });
    if (result) {
      MessageAlert.success('그룹이 삭제되었습니다.');
      history.push('/groups');
      return;
    }
    MessageAlert.error('그룹 삭제에 실패했습니다. 다시 요청하세요.');
  };

  /* 그룹 참석 여부 */
  const joinWhether = userInfo
    ? members.filter((item) => item.user_id === userInfo.user_id).length
    : 0;

  /* 관리자 여부 */
  const managerWhether = userInfo
    ? members
        .filter((item) => item.authority === 'manager')
        .filter((item) => item.user_id === userInfo.user_id).length
    : false;

  /* RENDER */
  return group ? (
    <>
      <Content maxWidth={'100%'}>
        <Card>
          <Content maxWidth={1200} style={{ padding: 12 }}>
            <h1
              style={{
                margin: 0,
                padding: 0,
                fontSize: '2.2em',
                color: '#4e4e4e',
              }}
            >
              {group.group_nm}
            </h1>
            <p style={{ fontSize: '1.05em', color: '#4e4e4e' }}>
              <span>
                {/* <EyeInvisibleOutlined /> */}
                {group.group_scope ? (
                  <>
                    <EyeOutlined /> 공개
                  </>
                ) : (
                  <>
                    <EyeInvisibleOutlined />
                    비공개
                  </>
                )}{' '}
                그룹
              </span>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <span>
                <TeamOutlined /> 멤버 {group.member_count}명
              </span>
            </p>
            <br />
            {/* 하단 컨텐츠 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {/* 아바타 */}
              <Avatar.Group
                maxCount={10}
                size="large"
                maxStyle={{
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                  marginLeft: 'auto',
                }}
              >
                {members.length > 0 &&
                  members.map((profile) => {
                    const { user_id, user_nm } = profile;
                    const [sn] = user_nm;
                    return (
                      <Avatar
                        key={user_id}
                        size="large"
                        style={{
                          border: '2px solid #fff',
                          marginRight: -10,
                          fontSize: '1.2em',
                        }}
                        src={user_id}
                      >
                        {sn}
                      </Avatar>
                    );
                  })}
              </Avatar.Group>

              {/* 버튼그룹 */}
              <div>
                <Button size="large">
                  <LinkOutlined /> 초대하기
                </Button>{' '}
                <Button
                  size="large"
                  type="primary"
                  disabled={joinWhether}
                  onClick={handleJoinGroup}
                >
                  <UserAddOutlined /> 가입하기
                </Button>
              </div>
            </div>
          </Content>
        </Card>
      </Content>

      {/* 메인 컨텐츠 */}
      <Content maxWidth={1200}>
        <Row>
          {/* 일정 */}
          <Col x={16} style={{ padding: 12 }}>
            <PageHeader
              className="site-page-header"
              title="일정"
              style={{ margin: 0, padding: 0 }}
            />
            <div style={{ height: '100%', overflowY: 'auto' }}>
              {filterSchedule.map((item) => {
                const { schedule_date, conferences } = item;
                return (
                  <ScheduleItem
                    key={schedule_date}
                    schedule_date={schedule_date}
                    conference={conferences}
                  />
                );
              })}
              {filterSchedule.length === 0 && (
                <Empty
                  description={
                    <Space direction="vertical">
                      <div>텅...</div>
                      {joinWhether ? (
                        <>
                          <div>컨퍼런스 일정을 추가해보세요!</div>
                          <div>
                            <Link
                              to={`/create/conference?group_id=${group_id}`}
                            >
                              <Button type="primary">추가</Button>
                            </Link>
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                    </Space>
                  }
                />
              )}
            </div>
          </Col>

          {/* 사이드 */}
          <Col x={8} style={{ padding: 12 }}>
            <PageHeader
              className="site-page-header"
              title="소개"
              style={{ margin: 0, padding: 0 }}
            />
            <Card bordered style={{ height: 203 }}>
              {group.group_desc}
            </Card>
            <br />
            <PageHeader
              className="site-page-header"
              title="캘린더"
              style={{ margin: 0, padding: 0 }}
            />
            <Card bordered>
              <Calendar
                dateCellRender={calData}
                locale="ko-kr"
                value={calendarDate}
                onSelect={(e) => onChangeDate(e)}
                headerRender={() => (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'cneter',
                      padding: '10px',
                    }}
                  >
                    <Space>
                      <Button onClick={() => onChangeDate(moment())}>
                        오늘
                      </Button>
                      <Button
                        type="text"
                        onClick={() => onChangeDate(false, 'prev')}
                      >
                        <LeftOutlined />
                      </Button>
                      <span>
                        {moment(calendarDate).format('yyyy년 MM월 DD일')}
                      </span>
                      <Button
                        type="text"
                        onClick={() => onChangeDate(false, 'next')}
                      >
                        <RightOutlined />
                      </Button>
                    </Space>
                  </div>
                )}
                style={{
                  width: '100%',
                }}
                fullscreen={false}
              />
            </Card>
            {managerWhether ? (
              <Popconfirm
                title={`정말로 ${group.group_nm} 그룹을 삭제하시겠습니까?`}
                onConfirm={handleDeleteGroup}
                okText="네, 삭제합니다."
                cancelText="아니오"
              >
                <Button
                  style={{ marginTop: '0.5vw', backgroundColor: 'transparent' }}
                  block
                  size="large"
                  danger
                >
                  그룹 삭제하기
                </Button>
              </Popconfirm>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Content>

      {/* === 생성버튼 === */}
      {joinWhether && (
        <div style={{ position: 'fixed', zIndex: 999, right: 70, bottom: 40 }}>
          <Link to={`/create/conference?group_id=${group_id}`}>
            <Button
              type="primary"
              shape="round"
              size="large"
              className="shadow"
              icon={<VideoCameraAddOutlined />}
              style={{ padding: '15px 30px', height: 58 }}
            >
              컨퍼런스 일정 생성
            </Button>
          </Link>
        </div>
      )}
    </>
  ) : (
    ''
  );
};

export default GroupDetail;
