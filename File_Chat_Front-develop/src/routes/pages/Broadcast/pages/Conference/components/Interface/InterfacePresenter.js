import React from 'react';
import { Button } from 'antd';
import { PhoneFilled } from '@ant-design/icons';
const InterfacePresenter = ({
  handleLeaveConference,
  handleDocumentSharingMode,
  handleMicMute,
  handleCameraMute,
  videoMute,
  audioMute,
}) => {
  return (
    <div className="interface-container">
      <div className="interface-right-box">
        <Button
          className="interface-button"
          danger
          icon={<PhoneFilled />}
          type="primary"
          shape="circle"
          size="large"
          onClick={() => {
            handleLeaveConference();
          }}
        ></Button>
      </div>
      <div className="interface-content-box">
        <div className="interface-button-group">
          <Button
            size="large"
            className={`interface-button ${audioMute ? 'mute' : ''} `}
            onClick={() => {
              handleMicMute();
            }}
          >
            마이크 <span>{audioMute ? 'ON' : 'OFF'}</span>
          </Button>
          <Button
            size="large"
            className={`interface-button ${videoMute ? 'mute' : ''} `}
            onClick={() => {
              handleCameraMute();
            }}
          >
            카메라 <span>{videoMute ? 'ON' : 'OFF'}</span>
          </Button>
          <Button size="large" className="interface-button">
            화면공유
          </Button>
          <Button
            size="large"
            className="interface-button"
            onClick={() => {
              handleDocumentSharingMode();
            }}
          >
            파일공유
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterfacePresenter;
