import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { conferenceEvents } from 'utils/jitsi/events';
import JitsiManager from 'utils/jitsi/JitsiManager';

const ChatBoard = () => {
  const [chatList, setChatList] = useState([]);
  const isJoined = useSelector((state) => state.conference.isJoined);
  const [bindingState, setBindingState] = useState(false);
  const participants = useSelector(
    (state) => state.participant.list,
    (left, right) => {
      return left.length === right.length;
    }
  );
  const lastChatRef = useRef();
  const localUserInfo = useSelector((state) => state.localUser);

  const jitsiManager = new JitsiManager();

  /**
   * @title 채팅 수신 리스너
   * @description 채팅 데이터를 받아서, 상태 적용
   * @param id 발신자
   * @param msg 내용
   * @param ts 발송 시간
   */
  const msgReceiveListener = (id, msg, ts) => {
    setNewChatList(id, msg, ts);
  };

  const setNewChatList = (id, msg, ts) => {
    const isMe = localUserInfo.id === id;
    const userInfo = !isMe
      ? participants.find((p) => p.id === id)
      : localUserInfo;

    console.log('localUserInfo: ', localUserInfo);
    console.log('id: ', id);
    console.log('isMe: ', isMe);
    console.log('userInfo: ', userInfo);
    const thumbnailCharacter = userInfo.name ? userInfo.name[0] : '';
    let prevId = null;

    if (lastChatRef.current) {
      prevId = lastChatRef.current.children[0].textContent;
    }

    const newChat = (
      <div
        className={`chat-content-box ${isMe ? 'me' : ''}`}
        key={chatList.length}
        ref={lastChatRef}
      >
        {/* 썸네일 */}
        <div
          className="thumb-box chat-user-id"
          style={{
            visibility: isMe ? 'hidden' : prevId === id ? 'hidden' : '',
          }}
        >
          <span className="text">{thumbnailCharacter}</span>
        </div>
        {/* 채팅 내용 */}
        <div
          className={`chat-content`}
          style={{
            marginTop: prevId === id ? '3px' : '15px',
          }}
        >
          <span className="chat-text">{msg}</span>
        </div>
      </div>
    );

    const newChatList = [...chatList, newChat];
    console.log('newChatList: ', newChatList);

    setChatList(newChatList);
  };

  useEffect(() => {
    if (isJoined && bindingState === false) {
      jitsiManager._conference.on(
        conferenceEvents.MESSAGE_RECEIVED,
        msgReceiveListener
      );
      console.log('바인딩');
      setBindingState(true);
    }
    return () => {
      jitsiManager._conference.off(
        conferenceEvents.MESSAGE_RECEIVED,
        msgReceiveListener
      );
      console.log('바인딩 해제');
      setBindingState(false);
    }; //eslint-disable-next-line
  }, [isJoined]);

  return (
    <div className="chat-board-container">
      <div className="chat-board-box">{chatList}</div>
    </div>
  );
};

export default ChatBoard;
