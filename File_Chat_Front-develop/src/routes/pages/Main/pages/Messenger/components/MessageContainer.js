/**
 *
 *
 */

import React, { useState, useEffect } from 'react';
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  // TypingIndicator,
  MessageSeparator,
} from '@chatscope/chat-ui-kit-react';
import { Button, Empty } from 'antd';
import { InfoOutlined, CloseOutlined } from '@ant-design/icons';

const avatarIco = `
  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEUOHCyclYufmI0AECZvbGkAACCjm5AIGCoxOUIAEycAFSgLGisNHCwEFykDFyljY2N9enUlLjkACCKWkIc+Q0lmZmWIhH0bJjN/e3YVIjGSjYRAREpbXF0tND54dXGEgHpKTVFTVVcfARIMAAADVklEQVR4nO3ciXaiMABA0ZA4lhBEcV+r/v9PTtA6FUVGLXOyzLtf4DtktVghAAAAAAAAAAAAAAAAAAAAAABAuIwej9XAuP4Y/4xR5XY+6U11pI1GL4ZrmSQyGaXZIHf9cTqXa7Gt+ipSfqZ64PoTdcuoYjj56js3jtJxRM/RqMUwueo7Ny6nqohjPtr1Zbi+6Ts1JqNpFsGak2eLxr5z4zItAp+PRtfn313jaT66/pTvM2p1N//uGvv7YOdjNf/ant/VWJ3qABsv+/szzmtOWHtHrldP950a7XwM6QxglJk9Mz7rjcvpOJCxWs2/v60vzY37qc78b7R9s1fGZ60xWW58PwMYu7+/Oj5vGr0+A9yer99qrM4AheuSZnZ/n8kf9p0a7RnAyzVHly+vnw8bq/no3faYbd5dX5obe749xNy8s0G0NW6166a6bNttYJJMxq6b6lSv68L+L9dNdRRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FFJIoXsUUkihexRSSKF7FL5Oxl4oR8p1U13XhXJdevb6ZbeFUo5K396E7rJQyvlBfLguutVdoUyWB+PfO9BdFUopZztV+NfXUaHs749KebbCXHTwFrScfKbGs5e7r5iy/7M8uR7ulNe/0Bt//uTHQNXq6evwvMjz+buJMumlYw9Xz1sfi7cS7ePbikB+XJntXk+Uk9FmpT0fnt+K3frFxzeZpdrLze+RbPdKX39+XKmPkPqsLJ0825d82tUlmOH5LZs+k2gf37DMwlhd7mSbJx7f/mBXl8CG5x+5PvzlcCP3UxXi8Pymju17xjys1bOJaj2Ey6O/h+tnGT1s+38taaArzLU8m7Ukpt59P/GGvO0+HEWhMC13qTgKRV48TIykUBgxepAYS6Ew+b45MZpCu2k0XxfjKRRm1ZgYUaEoyqbEmArtjbjhv4FEVdh46Y+rsCkxskKhN7eX/tgKhTrEXmgTZeSFuap/rxFf4e33GjEW1i/9MRbWL/1RFopc9/pxF15/rxFpoR2ol0t/rIX2Rvx16Y+20F4Xz5f+eAvtUzxdFyMuFKaw10Xp2zuHnRqU8/5chf53mVaDxSHqRyiqgRp5IAAAAAAAAAAAAAAAAAAAAAAA/4Hf0gU2cK/EibwAAAAASUVORK5CYII=
`;

//
const styles = {
  mychat: {
    float: 'right',
    alignItems: 'center',
    color: '#fff',
    maxWidth: 680,
  },
  otherchat: {
    float: 'left',
    width: '100%',
    alignItems: 'center',
    maxWidth: 680,
  },
  //style 추가 가능
};

/**
 * [Component]
 * --
 */

const MessageContainer = ({
  chatList,
  userList,
  currentRoomInfo,
  isOpenSidePanel,
  onOpenSidePanel,
  userId,
  onSetCommand,
  onSendMessage, // 메세지
  onSendFile,
  onUploadFile,
  onChangeDate,
  setFileViewer,
  icons,
}) => {
  /* ===== STATE ===== */
  //
  const [messageInputValue, setMessageInputValue] = useState('');
  //파일정보
  const [fileInfo, setFileInfo] = useState('');
  //
  const [dragLoad, setDragLoad] = useState(false);

  /* ===== Functions ===== */
  /**
   *
   * --
   */
  const handleSendMessage = () => {
    // 메세지를 보냈을때
    if (messageInputValue) onSendMessage(messageInputValue);
    setMessageInputValue('');
  };

  /**
   *
   * --
   */
  const handleOnLoad = () => {
    console.log('handleOnLoad !!! ')
    // console.log('ON----------------------------LOAD');
    if (dragLoad === false) {
      setDragLoad(true);
    }
  };

  /**
   *
   * --
   */
  const handleChangeFile = () => {
    console.log(document.getElementById('fileName').value);
    document.getElementById('fileName').click();
  };

  /* ===== HOOKS ===== */
  /**
   *
   * --
   */
  useEffect(() => {
    currentRoomInfo && console.log(currentRoomInfo.room_name);
  }, [currentRoomInfo]);

  /**
   *
   * --
   */
  useEffect(() => {
    console.log('file upload 이후 파일 처리 : '+fileInfo)
    onSendFile(fileInfo);
    // onUploadFile(fileInfo)
    // console.log('fileInfo:', fileInfo);
  }, [fileInfo]);

  /**
   *
   * --
   */
  useEffect(() => {
    if (dragLoad && document.querySelector('.uploadBox')) {
      const uploadBox = document.querySelector('.uploadBox');
      /* 박스 안에 Drag 들어왔을 때 */
      uploadBox.addEventListener('dragenter', function (e) {
        console.log('dragenter');
      });

      /* 박스 안에 Drag를 하고 있을 때 */
      uploadBox.addEventListener('dragover', function (e) {
        e.preventDefault();
        console.log('dragover');

        this.style.backgroundColor = '#6ea9d7';
      });

      /* 박스 밖으로 Drag가 나갈 때 */
      uploadBox.addEventListener('dragleave', function (e) {
        console.log('dragleave');

        this.style.backgroundColor = 'white';
      });

      /* 박스 안에서 Drag를 Drop했을 때 */
      uploadBox.addEventListener('drop', function (e) {
        e.preventDefault();

        console.log('drop');
        this.style.backgroundColor = 'white';

        const data = e.dataTransfer.files[0];
        // console.log('@@@@ file의 데이터 : '+JSON.stringify(data))
        // reader = new FileReader();

        // reader.onload = function(event) {
        //   // const fileData = {
        //   //   fileName : data.name,
        //   //   fileContent : e.target.result,
        //   // };
        //   data.fileContent = e.target.result
        //   onSendFile(data); // 파일 드래그 엔 드랍 -> handleSendFile() 실행시켜줌
        // }
        // reader.readAsDataURL(data);
        onSendFile(data);
        // onUploadFile(data);
      });
      console.log('dragLoad2 : ', dragLoad);
    } else {
      console.log('dragLoad1 : ', dragLoad);
    }
  }, [dragLoad]);

  /* ===== RENDER ===== */
  // 채팅방 선택해제 시
  if (!currentRoomInfo)
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Empty />
      </div>
    );
  //
  return (
    <>
      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Back />
          <Avatar src={avatarIco} name="Zoe" />
          <ConversationHeader.Content
            userName={currentRoomInfo && currentRoomInfo.room_name}
            info={currentRoomInfo && currentRoomInfo.info}
          />
          <ConversationHeader.Actions>
            <div>
              {isOpenSidePanel === false ? (
                <Button type="primary" shape="circle" onClick={onOpenSidePanel}>
                  <InfoOutlined style={{ fontSize: 18, fontWeight: 'bold' }} />
                </Button>
              ) : (
                <Button type="default" shape="circle" onClick={onOpenSidePanel}>
                  <CloseOutlined />
                </Button>
              )}
            </div>

            <div>
              <form
                id="fileForm"
                className="form-inline"
                style={{ display: 'none' }}
              >
                <div className="form-group sendfile">
                  <label htmlFor="msgForm">File: </label>
                  <input
                    type="file"
                    id="fileName"
                    onChange={() =>
                      setFileInfo(document.getElementById('fileName').files[0])
                    }
                  />
                  <button type="submit" className="btn btn-primary">
                    File Upload
                  </button>
                </div>
              </form>
            </div>
          </ConversationHeader.Actions>
        </ConversationHeader>

        <MessageList
        // typingIndicator={
        //   <TypingIndicator
        //     style={{ height: 35 }}
        //     content="김성훈님이 입력중입니다."
        //   />
        // }
        >
          <div
            className="uploadBox"
            onLoad={handleOnLoad()}
            style={{ height: '100%', zIndex: 999 }}
          >
            <MessageSeparator content="대화내용" />

            {chatList.map((chat) => {
              // 유저 썸네일 첫글자
              const userName = userList.filter(
                (item) => item.user_id === chat.user_id
              )[0]?.user_name;
              // 날짜
              const changeDate = onChangeDate(chat.chat_date);
              // 방향설정
              const direction =
                Number(userId) === chat.user_id ? 'outgoing' : 'incoming';
              // 스타일
              const style =
                Number(userId) === chat.user_id
                  ? styles.mychat
                  : styles.otherchat;
              // 파일여부
              const isFile = chat.files && chat.files.length > 0 ? true : false;
              // 아이콘
              const ICN = isFile
                ? icons[chat.files[0].file_exp.split('/')[1]]
                : null;

              /* VIEW */
              return (
                <>
                  <div
                    key={chat.chat_id}
                    style={{
                      width: '100%',
                      height: '90px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginTop: isFile ? 35 : 0,
                      marginBottom: isFile ? 185 : 10,
                    }}
                  >
                    {Number(userId) === chat.user_id ? (
                      <div style={{ flex: 1 }}></div>
                    ) : (
                      <></>
                    )}
                    <Message
                      model={{
                        direction,
                        // message: chat.chat_msg,
                        // message: <h2>{chat.chat_msg}</h2>,
                        type: 'html',
                        sentTime: '15 mins ago',
                        position: 'single',
                        // sender: 'Zoe',
                      }}
                      style={{ ...style }}
                    >
                      {/* <Message.HtmlContent
                      html={`
                        <p style="background:red; line-height:0; margin:0;">${chat.chat_msg}</p>
                      `}
                    /> */}
                      <Message.Header
                        sender={userName}
                        style={{
                          marginTop: 30,
                          fontSize: '1em',
                          fontWeight: 'bold',
                        }}
                      />
                      {/*  */}
                      {Number(userId) === chat.user_id ? (
                        <></>
                      ) : (
                        <Avatar
                          src={avatarIco}
                          name="Zoe"
                          style={{
                            background: '#f1f1f1',
                            display: 'flex',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'bold',
                            color: '#878787',
                            border: '1px solid #cdcdcd',
                          }}
                        >
                          {userName && userName[0]?.toUpperCase()}
                        </Avatar>
                      )}

                      <Message.TextContent>
                        {chat.chat_msg}
                        {isFile && (
                          <div
                            className="cusorOver"
                            style={{
                              background: '#fff',
                              borderRadius: 10,
                              marginTop: 5,
                              marginBottom: 5,
                              padding: '25px 65px',
                              textAlign: 'center',
                            }}
                            onClick={() => setFileViewer(chat.files[0])}
                          >
                            <Message.ImageContent
                              src={ICN ? ICN.src : null}
                              alt="Akane avatar"
                              width={72}
                              style={{ padding: 15 }}
                            />
                            <p style={{ marginTop: 8, marginBottom: 0 }}>
                              {chat.files[0].file_name}
                            </p>
                            <p style={{ marginBottom: 0, color: '#a1a1a1' }}>
                              {(chat.files[0].file_size / 1024 / 1024).toFixed(
                                2
                              )}
                              MB
                            </p>
                          </div>
                        )}
                      </Message.TextContent>

                      {/*  */}
                      {Number(userId) === chat.user_id ? (
                        <Message.Footer sentTime={changeDate} />
                      ) : (
                        <Message.Footer sender={changeDate} />
                      )}
                    </Message>
                  </div>
                </>
              );
            })}
          </div>
        </MessageList>
        <MessageInput
          placeholder="Type message here !!"
          value={messageInputValue}
          onChange={(val) => setMessageInputValue(val)}
          onSend={handleSendMessage}
          onAttachClick={handleChangeFile}
        />
      </ChatContainer>
    </>
  );
};

MessageContainer.defaultProps = {
  chatList: [],
  currentRoomInfo: {
    room_id: null,
    room_name: null,
    userName: null,
    info: null,
    status: null,
    unreadCnt: null,
  },
};
export default MessageContainer;
