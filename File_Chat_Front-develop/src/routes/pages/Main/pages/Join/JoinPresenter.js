import React from 'react';
import JOIN_MENU from 'assets/svg/joinMenu.svg';
import VIDEO_MENU from 'assets/svg/videoMenu.svg';

import './Join.css';

const JoinPresenter = ({ handleCreateRoom, handleJoinRoom }) => {
  return (
    <div className="join-container">
      <div className="join-flex-box">
        <div className="option-select-box">
          <div
            className="create-room-box room-box"
            onClick={() => {
              handleCreateRoom();
            }}
          >
            <img src={VIDEO_MENU} alt="" />
            <span className="menu-title">방만들기</span>
          </div>
          <div
            className="join-room-box room-box"
            onClick={() => {
              handleJoinRoom();
            }}
          >
            <img src={JOIN_MENU} alt="" />
            <span className="menu-title">참가하기</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinPresenter;
