/**
 *
 */

import { useEffect, useState } from 'react';
import { Content, Row, Col } from 'layout';
import { Badge, Button, Calendar, Card, Empty, Space } from 'antd';
import './dashboard.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { BannerSchedule } from './components';
import { ScheduleItem } from 'components/';
import moment from 'moment';
import { LCDashboardApi } from 'api';
import { useSelector } from 'react-redux';

/**
 * 대시보드
 * --
 */
const Dashboard = () => {
  /* Router */

  /* State */
  const [calendarDate, setCalendarDate] = useState(moment());
  const [conferences, setConferences] = useState([]);
  const [bannerItems, setBannerItems] = useState([]);
  const [filterdList, setFilterdList] = useState([]);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  /* Hooks */
  useEffect(() => {
    getDashboard();
    // eslint-disable-next-line
  }, [userInfo]);

  useEffect(() => {
    conferenceFilter(calendarDate);
    // eslint-disable-next-line
  }, [calendarDate, conferences, bannerItems]);
  /* Functions */

  const getDashboard = async () => {
    if (!userInfo) {
      return;
    }
    const { user_id } = userInfo;
    const result = await LCDashboardApi.getUserDashboard(user_id);
    if (result) {
      const { conferenceList, banners } = result;
      setConferences(conferenceList);
      conferenceFilter(calendarDate);
      setBannerItems(banners);
    }
  };

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

  const onCheckSchedule = (val) => {
    const [checked] = conferences.filter((item) => {
      const { schedule_date } = item;
      return (
        moment(val).format('yyyy-MM-DD') ===
        moment(schedule_date).format('yyyy-MM-DD')
      );
    });
    return checked;
  };

  const calData = (val) => {
    const temp = onCheckSchedule(val);
    if (temp) {
      return <Badge dot />;
    } else {
      return <Badge dot={false} />;
    }
  };

  const conferenceFilter = (filterDate) => {
    const temp = conferences.filter((item) => {
      const { schedule_date } = item;
      return moment(schedule_date).isSameOrAfter(
        moment(filterDate).format('YYYY-MM-DD')
      );
    });
    setFilterdList(temp);
  };

  /* RENDER */
  return (
    <Content maxWidth={1200}>
      {/* ===== 상단 베너 ===== */}
      <Row>
        <Col x={24}>
          <BannerSchedule slide={bannerItems} />
        </Col>
      </Row>

      {/* ===== 컨텐츠 ===== */}
      <Row>
        {/* === 캘린더 === */}
        <Col x={8}>
          <div
            style={{ fontSize: '0.75vw', fontWeight: '900', color: '#4e4e4e' }}
          >
            캘린더
          </div>
        </Col>
        <Col x={16}>
          <div
            style={{ fontSize: '0.85vw', fontWeight: '900', color: '#4e4e4e' }}
          >
            일정
          </div>
        </Col>
        <Col x={8}>
          <Card bordered className="slide-in-top">
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
                    <Button onClick={() => onChangeDate(moment())}>오늘</Button>
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
        </Col>
        {/* === 일정 === */}
        <Col x={16}>
          <div
            className="slide-in-top"
            style={{ height: '100%', overflowY: 'auto' }}
          >
            {filterdList.map((item) => {
              const { schedule_date, conferences } = item;
              return (
                <ScheduleItem
                  key={schedule_date}
                  schedule_date={schedule_date}
                  conference={conferences}
                />
              );
            })}
            {filterdList.length === 0 && <Empty description="텅..." />}
          </div>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;
