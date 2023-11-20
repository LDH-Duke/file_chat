import React from 'react';
import { Button, Card } from 'antd';
import { Content } from 'layout';
import { CaretRightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { Carousel } from 'components';

const EmptyBanner = () => {
  const history = useHistory();
  return (
    <Content maxWidth={1200}>
      <div style={{ borderTop: '3px solid #476cec' }}>
        <Carousel>
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
              <div
                style={{
                  width: '100%',
                  padding: '17px 0',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '2.15em',
                    fontWeight: '800',
                    lineHeight: 1,
                    textAlign: 'center',
                  }}
                >
                  FileChat
                </div>
              </div>
              <div style={{ width: '100%', textAlign: 'center' }}>
                채팅을 통해 파일을 공유하고 비용 부담없이 저장하세요
              </div>
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
                    icon={<CaretRightOutlined />}
                    onClick={() => history.push('/groups')}
                  >
                    참가하기
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Carousel>
      </div>
    </Content>
  );
};

export default EmptyBanner;
