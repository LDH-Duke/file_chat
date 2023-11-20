import React from 'react';
import { Select, Input, Form } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import MessageAlert from 'utils/MessageAlert';

const { Option } = Select;
const BroadcastInfo = ({ videoDevice, audioDevice, setDevice }) => {
  const handleSetDevice = (e, label) => {
    setDevice({ [label]: e });
  };
  return (
    <div style={{ padding: '10px 12px' }}>
      <Form layout="vertical">
        {/* 공유링크 */}
        <Form.Item label="라이브링크" style={{ marginBottom: 12 }}>
          <Input
            placeholder="input placeholder"
            addonAfter={
              <PaperClipOutlined
                onClick={() => {
                  navigator.clipboard.writeText('test');
                  MessageAlert.success('복사되었습니다.');
                }}
              />
            }
            disabled
          />
        </Form.Item>
        {/* 카메라 */}
        <Form.Item label="카메라" style={{ marginBottom: 12 }}>
          <Select
            placeholder="분류"
            onChange={(e) => handleSetDevice(e, 'video')}
          >
            {videoDevice.map((item) => {
              const { deviceId, label } = item;
              return (
                <Option key={deviceId} value={deviceId}>
                  {label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        {/* 마이크 */}
        <Form.Item label="마이크" style={{ marginBottom: 12 }}>
          <Select
            defaultValue="default"
            placeholder="분류"
            onChange={(e) => handleSetDevice(e, 'video')}
          >
            {audioDevice.map((item) => {
              const { deviceId, label } = item;
              return (
                <Option key={deviceId} value={deviceId}>
                  {label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BroadcastInfo;
