/**
 *
 *
 */

import React, { useState } from 'react';
import {
  Avatar,
  Conversation,
  ConversationList,
  // MainContainer,
  // ChatContainer,
  // MessageList,
  // Message,
  // MessageInput,
  // ConversationHeader,
  // TypingIndicator,
  // Sidebar,
  // Search,
  // MessageSeparator,
  // ExpansionPanel,
  // AvatarGroup,
  // Button,
  // StarButton,
  // VoiceCallButton,
  // VideoCallButton,
  // InfoButton,
  // InputToolbox,
  // Loader,
  // StatusList,
  // Status,
  // action,
} from '@chatscope/chat-ui-kit-react';

const avatarIco =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUOHCyclYufmI0AECZvbGkAACCjm5AIGCoxOUIAEycAFSgLGisNHCwEFykDFyljY2N9enUlLjkACCKWkIc+Q0lmZmWIhH0bJjN/e3YVIjGSjYRAREpbXF0tND54dXGEgHpKTVFTVVcfARIMAAADVklEQVR4nO3ciXaiMABA0ZA4lhBEcV+r/v9PTtA6FUVGLXOyzLtf4DtktVghAAAAAAAAAAAAAAAAAAAAAABAuIwej9XAuP4Y/4xR5XY+6U11pI1GL4ZrmSQyGaXZIHf9cTqXa7Gt+ipSfqZ64PoTdcuoYjj56js3jtJxRM/RqMUwueo7Ny6nqohjPtr1Zbi+6Ts1JqNpFsGak2eLxr5z4zItAp+PRtfn313jaT66/pTvM2p1N//uGvv7YOdjNf/ant/VWJ3qABsv+/szzmtOWHtHrldP950a7XwM6QxglJk9Mz7rjcvpOJCxWs2/v60vzY37qc78b7R9s1fGZ60xWW58PwMYu7+/Oj5vGr0+A9yer99qrM4AheuSZnZ/n8kf9p0a7RnAyzVHly+vnw8bq/no3faYbd5dX5obe749xNy8s0G0NW6166a6bNttYJJMxq6b6lSv68L+L9dNdRRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FL5Oxl4oR8p1U13XhXJdevb6ZbeFUo5K396E7rJQyvlBfLguutVdoUyWB+PfO9BdFUopZztV+NfXUaHs749KebbCXHTwFrScfKbGs5e7r5iy/7M8uR7ulNe/0Bt//uTHQNXq6evwvMjz+buJMumlYw9Xz1sfi7cS7ePbikB+XJntXk+Uk9FmpT0fnt+K3frFxzeZpdrLze+RbPdKX39+XKmPkPqsLJ0825d82tUlmOH5LZs+k2gf37DMwlhd7mSbJx7f/mBXl8CG5x+5PvzlcCP3UxXi8Pymju17xjys1bOJaj2Ey6O/h+tnGT1s+38taaArzLU8m7Ukpt59P/GGvO0+HEWhMC13qTgKRV48TIykUBgxepAYS6Ew+b45MZpCu2k0XxfjKRRm1ZgYUaEoyqbEmArtjbjhv4FEVdh46Y+rsCkxskKhN7eX/tgKhTrEXmgTZeSFuap/rxFf4e33GjEW1i/9MRbWL/1RFopc9/pxF15/rxFpoR2ol0t/rIX2Rvx16Y+20F4Xz5f+eAvtUzxdFyMuFKaw10Xp2zuHnRqU8/5chf53mVaDxSHqRyiqgRp5IAAAAAAAAAAAAAAAAAAAAAAA/4Hf0gU2cK/EibwAAAAASUVORK5CYII=';

/**
 * [Component] 채팅 목록
 * --
 */
const ChatList = ({ roomList, currentRoom, onChangeRoom }) => {
  /* ===== STATE ===== */

  console.log('currentRoom: ', currentRoom);

  const id = Number(currentRoom);
  /* ===== RENDER ===== */
  return (
    <ConversationList>
      {roomList.map((item, index) => (
        <Conversation
          key={`chat_${item.room_id}`}
          onClick={() =>
            onChangeRoom(item.room_id === id ? null : item.room_id)
          }
          {...{
            ...item,
            name: item.room_name,
            info: item.room_description,
            active: item.room_id === id,
          }}
        >
          <Avatar src={avatarIco} name={item.room_name} status={item.status} />
        </Conversation>
      ))}
    </ConversationList>
  );
};

ChatList.defaultProps = {
  roomList: [
    // {
    //   room_id: 'ra01',
    //   room_name: '과제1단톡',
    //   userName: 'Derek',
    //   room_description: 'Yes i can do it for you',
    //   status: 'available',
    //   unreadCnt: 0,
    // },
  ],
};

export default ChatList;
