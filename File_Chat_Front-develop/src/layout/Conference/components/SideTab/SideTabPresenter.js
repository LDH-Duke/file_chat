import React, { useState } from 'react';
import { Chatting, Participants } from './components';

import { Tabs } from 'antd';
import './SideTab.css';

const { TabPane } = Tabs;

const SideTabPresenter = () => {
  // eslint-disable-next-line
  const [tab, setTab] = useState('CHAT');
  return (
    <div className="side-tab-container">
      <Tabs
        style={{
          backgroundColor: '#343434',
          color: '#fff',
        }}
        onChange={(key) => {
          setTab(key);
        }}
      >
        <TabPane tab="채팅" key="CHAT">
          <Chatting />
        </TabPane>
        <TabPane tab="참가자" key="FILE">
          <Participants />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SideTabPresenter;
