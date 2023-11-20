import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Content } from 'layout';

const BannerItem = ({ banner, next, prev }) => {
  const {
    conference_id,
    conference_nm,
    group_id,
    group_nm,
    user_id,
    user_nm,
  } = banner;

  const history = useHistory();

  const go = (path) => {
    history.push(path);
  };

  return (
    <Content maxWidth={1200}>
      <Card
        bordered
        className="slide-in-top"
        style={{
          marginTop: 10,
          padding: '5px 35px',
          borderTop: '3px solid #476cec',
          // borderBottom: '1px solid #476cec',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <div style={{ width: '100%', padding: '17px 0' }}>
            <div
              style={{
                fontSize: '1.15em',
                color: '#8f8f8f',
                fontWeight: 'bold',

                cursor: 'pointer',
              }}
              onClick={() => go(`/groups/${group_id}`)}
            >
              {group_nm}
            </div>
            <div
              style={{
                fontSize: '2.15em',
                fontWeight: '800',
                lineHeight: 1,
              }}
            >
              {conference_nm}
            </div>
          </div>
          {/* <div>
            <MDEditor.Markdown source={conference_desc} />
          </div> */}
          <div
            style={{
              width: '100%',
              padding: '15px 0',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Avatar size={36} src={user_id}>
                {user_nm.slice(0, 1)}
              </Avatar>
              <div style={{ margin: '0 0.5vw' }}>
                <div
                  style={{
                    fontSize: '0.75vw',
                    fontWeight: '500',
                    lineHeight: 1,
                  }}
                >
                  {user_nm}
                </div>
              </div>
            </div>
            <div
              style={{
                width: '20%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Button
                type="primary"
                size="large"
                style={{
                  width: '100%',
                  height: '100%',
                }}
                onClick={() => go(`/conference/${conference_id}`)}
                icon={<CaretRightOutlined />}
              >
                참가하기
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <div
        style={{
          position: 'absolute',
          top: '47px',
          right: '65px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
        }}
      >
        {/* <Button type="text" onClick={prev} icon={<LeftOutlined />}></Button>
        <Button type="text" onClick={next} icon={<RightOutlined />}></Button> */}
        <Button
          type="text"
          size="large"
          onClick={prev}
          icon={<CaretLeftOutlined />}
        ></Button>
        <Button
          type="text"
          size="large"
          onClick={next}
          icon={<CaretRightOutlined />}
        ></Button>
      </div>
    </Content>
  );
};

BannerItem.defaultProps = {
  banner: {
    conference_id: 1,
    live_nm: 'Slicon Valley Career Fair',
    group_id: 1,
    group_nm: 'SV Developer Group',
    user_nm: 'Kerry',
    user_icon: '',
    user_desc: 'Planet designer',
  },
  next: () => {},
  prev: () => {},
};

export default BannerItem;
