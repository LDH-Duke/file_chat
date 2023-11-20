import {
  AudioFilled,
  AudioOutlined,
  CameraFilled,
  SoundOutlined,
} from '@ant-design/icons';
import { Button, Card, Input, Popover, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import DEFAULT_IMAGE from 'assets/images/defaultVideo.png';
import './Ready.css';
import { useSelector } from 'react-redux';

const ReadyPresenter = ({
  videoDevices,
  audioInputDevices,
  audioOutputDevices,
  handleJoinConference,
}) => {
  /* Router */
  /* State */
  const [userName, setUserName] = useState('');
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  /* Hooks */
  useEffect(() => {
    if (!userInfo) return;
    setUserName(userInfo.user_nm);
  }, [userInfo]);

  /* Functions */
  /* Render */
  return (
    <div className="ready-container">
      <div className="ready-flex-box">
        <div className="preview-video-layer">
          <video poster={DEFAULT_IMAGE} autoPlay></video>
        </div>
        <div className="dimmer-layer"></div>
        <div className="interface-area">
          <div className="interface-flex-box">
            <div className="title-box">
              <span className="title">화상회의 시작하기</span>
            </div>
            <div className="nickname-input-box">
              <Input
                placeholder="닉네임을 입력하세요."
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>

            <div className="btn-box">
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  handleJoinConference(userName);
                }}
              >
                참가하기
              </Button>
            </div>

            <div className="media-control-box">
              {/* SECTION 오디오 디바이스 목록 */}
              <Popover
                content={
                  <>
                    <Card
                      className="media-option-card"
                      title={
                        <>
                          <AudioOutlined /> 마이크
                        </>
                      }
                    >
                      <Radio.Group
                        buttonStyle="solid"
                        className="media-option-radio-group"
                      >
                        {audioInputDevices.map((device) => {
                          const { deviceId, label } = device;

                          return (
                            <Radio.Button value={deviceId}>
                              {label}
                            </Radio.Button>
                          );
                        })}
                      </Radio.Group>
                    </Card>
                    <Card
                      className="media-option-card"
                      title={
                        <>
                          <SoundOutlined /> 스피커
                        </>
                      }
                    >
                      <Radio.Group
                        buttonStyle="solid"
                        className="media-option-radio-group"
                      >
                        {audioOutputDevices.map((device) => {
                          const { deviceId, label } = device;

                          return (
                            <Radio.Button value={deviceId}>
                              {label}
                            </Radio.Button>
                          );
                        })}
                      </Radio.Group>
                    </Card>
                  </>
                }
                trigger="click"
              >
                <Button shape="circle" size="large" icon={<AudioFilled />} />
              </Popover>
              {/* SECTION 비디오 디바이스 목록 */}
              <Popover
                content={
                  <Radio.Group
                    buttonStyle="solid"
                    className="media-option-radio-group"
                  >
                    {videoDevices.map((device) => {
                      const { deviceId, label } = device;

                      return (
                        <Radio.Button value={deviceId}>{label}</Radio.Button>
                      );
                    })}
                  </Radio.Group>
                }
                trigger="click"
              >
                <Button shape="circle" size="large" icon={<CameraFilled />} />
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyPresenter;
