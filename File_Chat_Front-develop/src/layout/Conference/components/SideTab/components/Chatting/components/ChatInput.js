import { Button, Input } from 'antd';
import React, { useState } from 'react';
import JitsiManager from 'utils/jitsi/JitsiManager';

const ChatInput = () => {
  const jitsiManager = new JitsiManager();
  const [text, setText] = useState('');

  // FIXME 오경우 팀장님 CHATTING INSERT API (채팅도 JITSI 내부 브로드캐스팅 서비스로 되어있긴합니다만, 바꿀 수 있음다.)
  const handleChattingSend = () => {
    jitsiManager.sendMessage(text);
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-box">
        <div className="chat-input-area">
          <Input
            id="chatText"
            type="text"
            allowClear
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onPressEnter={() => {
              handleChattingSend();
              setText('');
            }}
          />
        </div>
        <div className="chat-send-button-area">
          <Button
            id="sendButton"
            type="primary"
            onClick={() => {
              handleChattingSend();
              setText('');
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
