/**
 *
 *
 *
 */

import './Messenger.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import React, { useState } from 'react';
import { MainContainer } from '@chatscope/chat-ui-kit-react';
import ChatSidebar from './components/ChatSidebar';
import MessageContainer from './components/MessageContainer';
import SidePanel from './components/SidePanel';
import { ModalLayout, Row, Col } from 'components';
import { Button } from 'antd';

import i_pdf from 'assets/icons/icon_pdf.png';
import i_aac from 'assets/icons/icon_aac.png';
import i_docx from 'assets/icons/icon_docx.png';
import i_dmg from 'assets/icons/icon_dmg.png';
import i_etc from 'assets/icons/icon_etc.png';
import i_exe from 'assets/icons/icon_exe.png';
import i_gif from 'assets/icons/icon_gif.png';
import i_html from 'assets/icons/icon_html.png';
import i_jpg from 'assets/icons/icon_jpg.png';
import i_mp4 from 'assets/icons/icon_mp4.png';
import i_png from 'assets/icons/icon_png.png';
import i_ppt from 'assets/icons/icon_ppt.png';
import i_psd from 'assets/icons/icon_psd.png';
import i_svg from 'assets/icons/icon_svg.png';
import i_xlsx from 'assets/icons/icon_xlsx.png';
import i_zip from 'assets/icons/icon_zip.png';

const icons = {
  pdf: {
    src: i_pdf,
    title: 'pdf',
  },
  aac: {
    src: i_aac,
    title: 'aac',
  },
  docx: {
    src: i_docx,
    title: 'docx',
  },
  dmg: {
    src: i_dmg,
    title: 'dmg',
  },
  etc: {
    src: i_etc,
    title: 'etc',
  },
  exe: {
    src: i_exe,
    title: 'exe',
  },
  gif: {
    src: i_gif,
    title: 'gif',
  },
  html: {
    src: i_html,
    title: 'html',
  },
  jpg: {
    src: i_jpg,
    title: 'jpg',
  },
  mp4: {
    src: i_mp4,
    title: 'mp4',
  },
  png: {
    src: i_png,
    title: 'png',
  },
  ppt: {
    src: i_ppt,
    title: 'ppt',
  },
  psd: {
    src: i_psd,
    title: 'psd',
  },
  svg: {
    src: i_svg,
    title: 'svg',
  },
  xlsx: {
    src: i_xlsx,
    title: 'xlsx',
  },
  zip: {
    src: i_zip,
    title: 'zip',
  },
};

/**
 * [Component] Messenger Presenter
 * --
 */
export default function MessengerPresenter(props) {
  /* ====== PROPS ====== */
  const {
    roomList,
    userList,
    currentRoom,
    currentRoomInfo,
    userInfo,
    chatList,
    userId,
    // onJoinRoom,
    // onGetRoomList,
    onChangeRoom,
    onSetCommand,
    onCreateRoom,
    onSendMessage,
    onSendFile,
    onUploadFile,
    onUpdateFTP,
    onChangeDate,
    onFileDownload,
  } = props;

  /* ====== STATE ====== */
  const [isOpenSidePanel, setIsOpenSidePanel] = useState(false);
  const [fileViewer, setFileViewer] = useState(null);

  /* ====== VARIABLES ====== */

  /* ====== FUNCTIONS ====== */
  const handleGetIcon = (exp) => {
    if (icons[exp]) {
      return icons[exp];
    } else {
      return icons['etc'];
    }
  };

  /* ====== HOOKS ====== */

  /* ====== RENDER ====== */
  return (
    <>
      <div
        style={{
          width: '100%',
          height: 'calc(100% - 70px)',
          position: 'absolute',
        }}
      >
        <MainContainer responsive>
          {/* 채팅목록 */}
          <ChatSidebar
            userInfo={userInfo}
            roomList={roomList}
            userList={userList}
            currentRoom={currentRoom}
            onChangeRoom={onChangeRoom}
            onCreateRoom={onCreateRoom}
          />
          {/* 채팅창 */}
          <MessageContainer
            chatList={chatList}
            userList={userList}
            userId={userId}
            currentRoomInfo={currentRoomInfo}
            isOpenSidePanel={isOpenSidePanel}
            onOpenSidePanel={() => setIsOpenSidePanel(!isOpenSidePanel)}
            onSetCommand={onSetCommand}
            onSendMessage={onSendMessage}
            onSendFile={onSendFile}
            onUploadFile={onUploadFile}
            onChangeDate={onChangeDate}
            setFileViewer={setFileViewer}
            icons={icons}
          />
          {/* 사이드패널 */}
          {isOpenSidePanel && (
            <SidePanel
              currentRoomInfo={currentRoomInfo}
              userList={userList}
              onUpdateFTP={onUpdateFTP}
              setFileViewer={setFileViewer}
            />
          )}
        </MainContainer>
      </div>

      <ModalLayout
        title={fileViewer ? fileViewer.file_name : '파일 상세보기'}
        width={650}
        visible={fileViewer !== null}
        onOk={() => setFileViewer(null)}
        onCancel={() => setFileViewer(null)}
        style={{ padding: 15 }}
        closable
        footer={
          <div
            style={{
              textAlign: 'right',
              width: '100%',
            }}
          >
            <Button
              size={'large'}
              onClick={() => setFileViewer(null)}
              style={{ marginRight: '1%', width: '48.5%' }}
            >
              닫기
            </Button>
            <Button
              size={'large'}
              type="primary"
              style={{ width: '48.5%' }}
              // onClick={() => setFileViewer(null)}
              onClick={() => onFileDownload(fileViewer.file_id)
                // (window.location.open =
                //   'ftp://seongh7800:fg!468938@seongh7800.dothome.co.kr/html/nodejs.zip')
                  // (window.location.open =
                  //   'ftp://192.168.219.181:50001/home/testuser/testDir')
                  // onFileDownload(fileViewer.file_saveId)
              }
            >
              다운로드
            </Button>
          </div>
        }
      >
        <Row>
          <Col x={6}>
            <img
              src={
                fileViewer &&
                handleGetIcon(fileViewer.file_exp.split('/')[1]).src
              }
              alt=""
              style={{
                width: '75%',
                margin: '0 auto',
              }}
            />
          </Col>
          <Col x={18}>
            {fileViewer && (
              <Row>
                <Col x={4}>
                  <b>저장키 :</b>
                </Col>
                <Col x={20}>{fileViewer.file_saveId}</Col>
                <Col x={4}>
                  <b>파일명 :</b>
                </Col>
                <Col x={20}>{fileViewer.file_name}</Col>
                <Col x={4}>
                  <b>사이즈 :</b>
                </Col>
                <Col x={20}>{fileViewer.file_size}</Col>
                <Col x={4}>
                  <b>형식 :</b>
                </Col>
                <Col x={20}>{fileViewer.file_exp}</Col>
                <Col x={4}>
                  <b>작성자 :</b>
                </Col>
                <Col x={20}>{fileViewer.user_id}</Col>
                <Col x={4}>
                  <b>저장경로 :</b>
                </Col>
                <Col x={20}>
                  {fileViewer.file_path ? fileViewer.file_path : '-'}
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </ModalLayout>
    </>
  );
}
