import { Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ScheduleItem = ({ schedule_date, conference }) => {
  return (
    schedule_date && (
      <div style={{ marginBottom: 15 }}>
        <div style={{ padding: '0.2vh 0 0.5vh 0.1vw', color: '#4e4e4e' }}>
          {moment(schedule_date).format('yyyy년 MM월 DD일 (dd요일)')}
        </div>
        {conference.map((item) => {
          const {
            conference_date,
            conference_id,
            conference_nm,
            group_nm,
            user_id,
            user_nm,
          } = item;
          return (
            <Link to={`/conference/${conference_id}`} key={conference_id}>
              <Card
                bordered
                bodyStyle={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  cursor: 'pointer',
                  height: 85,
                  color: '#4e4e4e',
                  fontFamily: 'NanumGothic',
                }}
              >
                <div
                  style={{
                    width: '10%',
                    fontSize: '1.25em',
                    color: '#4e4e4e',

                    // padding: '0.2vw',
                  }}
                >
                  {moment(conference_date * 1000).format('HH:mm')}
                </div>
                <div
                  style={{
                    width: '70%',
                  }}
                >
                  <h4
                    style={{
                      color: '#4e4e4e',
                      fontWeight: 'bold',
                      lineHeight: 1.4,
                      padding: 0,
                    }}
                  >
                    <small>{group_nm}</small>
                    <br />
                    {conference_nm}
                  </h4>
                </div>
                <div
                  style={{
                    width: '20%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <Avatar src={user_id}>{user_nm.slice(0, 1)}</Avatar>
                  &nbsp;&nbsp;
                  <span style={{ fontSize: '0.85rem' }}>{user_nm}</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    )
  );
};

ScheduleItem.defaultProps = {
  conference: [
    {
      live_date: 1615010425,
      group_nm: 'Pusan Startup: Idea to IPO',
      live_nm:
        'FREE! Pitch Practice: How to Pitch to Investors and Get the Deal',
      user_nm: 'Coop Oh',
      user_desc: 'Plain Designer',
      group_icon: undefined,
      schedule_id: 1,
      group_id: 1,
    },
    {
      live_date: 1615010425,
      group_nm: 'Pusan Startup: Idea to IPO',
      live_nm:
        'FREE! Pitch Practice: How to Pitch to Investors and Get the Deal',
      user_nm: 'Coop Oh',
      user_desc: 'Plain Designer',
      group_icon: undefined,
      schedule_id: 1,
      group_id: 1,
    },
  ],
  schedule_date: '2021년 03월 04일 목요일',
};

export default ScheduleItem;
