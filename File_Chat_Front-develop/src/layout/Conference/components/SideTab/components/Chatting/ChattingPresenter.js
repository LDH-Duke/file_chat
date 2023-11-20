import React from 'react';
import { ChatBoard, ChatInput } from './components';
const ChattingPresenter = () => {
  return (
    <div className="chatting-container">
      <ChatBoard />
      <ChatInput />
    </div>
  );
};

export default ChattingPresenter;
