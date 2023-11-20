/**
 *
 *
 */

import React, { useState } from 'react';
import { Sidebar, ExpansionPanel } from '@chatscope/chat-ui-kit-react';
import { Tabs, Card, Avatar, Select, Button, Form, Input } from 'antd';
import { Row, Col, ModalLayout, Title } from 'components';
// import { UserOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { MessageAlert } from 'utils';
// import JPEG_ICON from 'assets/images/JPEG.png';
// import PNG_ICON from 'assets/images/PNG.png';
// import PDF_ICON from 'assets/images/PDF.png';
import { API } from 'api';

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
const { Option } = Select;

/**
 * [Component] 사이드 패널
 * --
 */
const SidePanel = ({
  currentRoomInfo,
  userList,
  onUpdateFTP,
  setFileViewer,
}) => {
  const [form] = Form.useForm();
  /* ===== STATE ===== */
  const [inviteList, setInviteList] = useState([]);
  const [members] = useState([1, 2, 3, 4, 5, 6]);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  const [currentTab, setCurrentTab] = useState('t1');
  const [defaultMemebers, setDefaultMembers] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [ftpInfo, setFtpInfo] = useState({
    room_ftptype: 'sftp',
    room_ftpip: '',
    room_ftppath: '',
    room_ftpid: '',
    room_ftppw: '',
    room_ftpport: 21,
  });

  /* ===== Functions ===== */
  /**
   *
   */
  const handleChange = (value) => {
    setInviteList(value);
    setCreateModal(false);
  };

  /**
   * FTP정보 변경 함수
   * --
   */
  const handleChangeFtp = ({ target }) => {
    const { name, value } = target;
    setFtpInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleButtonClick = async (room_id) => {
    try {
      const response = await API.authCodeSearch(room_id);

      // 반환된 데이터를 사용하여 상태를 업데이트
      // 예: data에서 필요한 값을 추출하여 상태를 업데이트
      // setSomeState(data.someValue);

      // 모달을 띄우기
      currentRoomInfo.room_auth_code = response.auth_code
      currentRoomInfo.valid_time = response.valid_time
      setCreateModal(true);  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLeaveRoom = async (room_id) => {
    try {
      const response = await API.leaveRoom(room_id);

      window.location.href = '/explorer';
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /**
   * 저장 함수
   * --
   */
  const handleSave = async () => {
    try {
      const newData = {
        room_ftptype: ftpInfo.room_ftptype,
        room_ftpip: ftpInfo.room_ftpip,
        room_ftppath: ftpInfo.room_ftppath,
        room_ftpid: ftpInfo.room_ftpid,
        room_ftppw: ftpInfo.room_ftppw,
        room_ftpport: ftpInfo.room_ftpport,
      };
      const result = await onUpdateFTP(newData);
      if (result) {
        setModifyModal(false);
      }
    } catch (err) {
      console.log('[SidePanel][handleSave] Error: ', err);
      MessageAlert.error(err.message);
    }
  };

   /**
   * 채팅방 친구 초대
   * --
   */
  const handleInviteFriend = async () => {
    const body = {
      room_id : currentRoomInfo.room_id,
      members : inviteList,
    }
    const inviteFriend = await API.inviteUser(body);
    if(inviteFriend.status != 200 ) {
      alert('친구 초대에 살패하였습니다.')
    } else {
      const notExistAccountEmails = inviteFriend.data.notExistAccount
      if(notExistAccountEmails.length > 0){
        const emailList = notExistAccountEmails.join('\n');
        alert('친구 초대를 완료하였습니다. 아래의 이메일은 회원이 아니므로 초대 메일을 전송하였습니다. \n' + emailList)
      }else {
        alert('친구 초대를 완료하였습니다.',)
      }
    }
  }

  /* ===== Variables ===== */
  const { files } = currentRoomInfo ? currentRoomInfo : [];

  /* ===== Hooks ===== */
  useEffect(() => {
    currentRoomInfo &&
      setFtpInfo({
        room_ftpip: currentRoomInfo.room_ftpip,
        room_ftppath: currentRoomInfo.room_ftppath,
        room_ftpid: currentRoomInfo.room_ftpid,
        room_ftppw: currentRoomInfo.room_ftppw,
        room_ftpport: currentRoomInfo.room_ftpport,
        room_ftptype: currentRoomInfo.room_ftptype,
      });
  }, [currentRoomInfo]);

  console.log('ftpInfo: ', ftpInfo);
  /* ===== Render ===== */
  return (
    <>
      <Sidebar position="right" style={{ paddingTop: 46 }}>
        <Tabs
          defaultActiveKey={'t1'}
          onChange={setCurrentTab}
          style={{
            height: 46,
            top: 0,
            width: '100%',
            position: 'absolute',
          }}
          centered
        >
          {/* 기본정보 */}
          <Tabs.TabPane tab="기본정보" key="t1" />

          {/* 파일목록 */}
          <Tabs.TabPane tab={`파일목록(${files && files.length})`} key="t2" />
        </Tabs>

        {/* ===== 탭 컨텐츠 ===== */}
        {currentTab === 't1' ? (
          // === 기본정보 === //
          <>
            <ExpansionPanel open title="FTP 연결정보">
              {/* <p>저장폴더: /Users/gimseonghun/Projects </p> */}
              <p>구분: {currentRoomInfo && currentRoomInfo.room_ftptype}</p>
              <p>FTP서버: {currentRoomInfo && currentRoomInfo.room_ftpip}</p>
              <p>저장경로: {currentRoomInfo && currentRoomInfo.room_ftppath}</p>
              <p>계정: {currentRoomInfo && currentRoomInfo.room_ftpid}</p>
              <p>패스워드: {currentRoomInfo && currentRoomInfo.room_ftppw}</p>
              <p>포트: {currentRoomInfo && currentRoomInfo.room_ftpport}</p>
              <p>
                <Button block size="small" onClick={() => setModifyModal(true)}>
                  편집하기
                </Button>
              </p>
            </ExpansionPanel>
            <ExpansionPanel open title={`멤버(${members.length})`}>
              <Row>
                <Col x={12} style={{ padding: 3 }}>
                  <Card
                    hoverable
                    style={{
                      height: 56,
                      padding: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#2e63e8',
                      border: '1px dotted #2e63e8',
                      background: '#f2f6ff',
                    }}
                    onClick={() => setAddMemberModal(true)}
                  >
                    + Invite
                  </Card>
                </Col>
                {currentRoomInfo &&
                  currentRoomInfo.invites.map((item) => (
                    <Col
                      x={12}
                      style={{ padding: 3 }}
                      key={`invitememberkey${item.invite_id}`}
                    >
                      {item.user && (
                        <Card hoverable bodyStyle={{ padding: '12px 10px' }}>
                          <Avatar>{item?.user?.user_name[0]}</Avatar>{' '}
                          {item?.user?.user_name}
                        </Card>
                      )}
                    </Col>
                  ))}
              </Row>
            </ExpansionPanel>
            <ExpansionPanel title="설정">
            <p>
              <Button block size="small" onClick={()=>handleButtonClick(currentRoomInfo.room_id)}>
                인증코드 발급 
              </Button>
              </p>
              <p>나가기 이용약관</p>
              <p>
                <Button block size="small" danger onClick={()=>handleLeaveRoom(currentRoomInfo.room_id)}>
                  채팅방 나가기
                </Button>
              </p>
            </ExpansionPanel>
          </>
        ) : (
          // === 파일목록 === //
          <>
            <Row>
              {files &&
                files.map((file) => {
                  const ICN = icons[file.file_exp.split('/')[1]];

                  return (
                    <Col
                      x={12}
                      style={{ padding: 5 }}
                      key={`kew_${file.file_id}`}
                    >
                      <Card
                        hoverable
                        onClick={() => setFileViewer(file)}
                        cover={
                          <img
                            alt="example"
                            src={ICN && ICN.src}
                            style={{
                              maxWidth: 80,
                              maxHeight: 80,
                              width: '100%',
                              height: '100%',
                              margin: '15px auto',
                            }}
                          />
                        }
                        bodyStyle={{ padding: '15px 10px' }}
                      >
                        <Card.Meta
                          title={
                            <span style={{ fontSize: '0.85em' }}>
                              {file.file_name}
                            </span>
                          }
                          description={
                            <>
                              {(file.file_size / 1024 / 1024).toFixed(2)}MB
                              <br />
                              {file.file_exp}
                            </>
                          }
                          style={{ lineHeight: 1.05, fontSize: '0.85em' }}
                        />
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </>
        )}
      </Sidebar>

      {/* ===== 모달 레이아웃 ===== */}
      {/* === 멤버추가 === */}
      <ModalLayout
        type={'drawer'}
        title={'FTP 연결정보 수정'}
        width={320}
        visible={modifyModal}
        onOk={() => setModifyModal(false)}
        onCancel={() => setModifyModal(false)}
        style={{ padding: 15 }}
        footer={
          <div
            style={{
              textAlign: 'right',
              width: '100%',
            }}
          >
            <Button
              size={'large'}
              onClick={() => setModifyModal(false)}
              style={{ marginRight: '1%', width: '30%' }}
            >
              취소
            </Button>
            <Button
              size={'large'}
              type="primary"
              style={{ width: '69%' }}
              onClick={handleSave}
            >
              수정 완료
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item label="FTP서버">
            <Select
              defaultValue="sftp"
              value={ftpInfo.room_ftptype}
              options={[
                { value: 'sftp', label: 'SFTP' },
                { value: 'ftp', label: 'FTP' },
              ]}
              onChange={(value) =>
                handleChangeFtp({ target: { name: 'room_ftptype', value } })
              }
              style={{
                width: '29%',
              }}
            />
            <Input
              placeholder="아이피를 입력해주세요"
              name="room_ftpip"
              value={ftpInfo.room_ftpip}
              onChange={handleChangeFtp}
              style={{
                width: '70%',
                marginLeft: '1%',
              }}
            />
          </Form.Item>
          <Form.Item label="저장경로">
            <Input
              placeholder="저장경로를 입력해주세요"
              name="room_ftppath"
              value={ftpInfo.room_ftppath}
              onChange={handleChangeFtp}
            />
          </Form.Item>
          <Form.Item label="계정">
            <Input
              placeholder="아이디를 입력해주세요"
              name="room_ftpid"
              value={ftpInfo.room_ftpid}
              onChange={handleChangeFtp}
            />
          </Form.Item>
          <Form.Item label="패스워드">
            <Input
              placeholder="패스워드를 입력해주세요"
              name="room_ftppw"
              value={ftpInfo.room_ftppw}
              onChange={handleChangeFtp}
            />
          </Form.Item>
          <Form.Item label="포트">
            <Input
              placeholder="포트를 입력해주세요"
              name="room_ftpport"
              value={ftpInfo.room_ftpport}
              onChange={handleChangeFtp}
            />
          </Form.Item>
        </Form>
      </ModalLayout>

      {/* = 멤버추가 = */}
      <ModalLayout
        type={'drawer'}
        title={'멤버 초대'}
        width={320}
        visible={addMemberModal}
        onOk={() => setAddMemberModal(false)}
        onCancel={() => setAddMemberModal(false)}
        style={{ padding: 15 }}
        footer={
          <div
            style={{
              textAlign: 'right',
              width: '100%',
            }}
          >
            <Button
              size={'large'}
              onClick={() => setAddMemberModal(false)}
              style={{ marginRight: '1%', width: '30%' }}
            >
              취소
            </Button>
            <Button
              size={'large'}
              type="primary"
              style={{ width: '69%' }}
              // onClick={() => setAddMemberModal(false)}
              onClick ={handleInviteFriend}
              disabled={inviteList.length < 1}
            >
              ({inviteList.length})명 완료
            </Button>
          </div>
        }
      >
        <Title size={5} color="#333">
          새 멤버
        </Title>
        <Select
          mode="tags"
          allowClear
          style={{
            width: '100%',
          }}
          placeholder="Please select"
          defaultValue={[]}
          onChange={handleChange}
        >
          {/* {userList.map((item) => (
            <Option key={`${item.user_id}`}>{item.user_name}</Option>
          ))} */}
        </Select>
        {/* <Select
          mode="tags"
          placeholder="이메일을 입력해주세요"
          defaultValue={[]}
          value={inviteList}
          onChange={handleChange}
          style={{
            width: '100%',
            marginBottom: 15,
          }}
        /> */}

        {/* <Title size={5} color="#333">
          선택({inviteList.length})
        </Title>
        {!inviteList || inviteList.length < 1 ? (
          <Empty />
        ) : (
          inviteList.map((item, index) => (
            <Card
              key={`selected_member_${index}`}
              hoverable
              style={{
                marginTop: 5,
              }}
              bodyStyle={{
                padding: '12px 10px',
                // width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ textAlign: 'left', flex: 1 }}>
                <UserOutlined />
                &nbsp;
                {item}
              </div>
              <div>
                <Button
                  size="small"
                  type="link"
                  danger
                  onClick={() =>
                    setInviteList(inviteList.filter((i) => i !== item))
                  }
                >
                  삭제
                </Button>
              </div>
            </Card>
          ))
        )} */}
      </ModalLayout>

      {/* = 인증코드 확인 모달 = */}
      <ModalLayout 
        // type={'drawer'}
        title={'인증코드 발급 완료'}
        width={540}
        visible={createModal}
        onOk={() => setCreateModal(false)}
        onCancel={() => setCreateModal(false)}
        style={{ top: 70 }}
        bodyStyle={{ padding: 20 }}
        footer={
          <div
            style={{
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Button
              size={'large'}
              type="primary"
              style={{ width: '69%' }}
              onClick={() => setCreateModal(false)}
            >
              확인
            </Button>
          </div>
        }
      >
        <div style={{
          textAlign: 'center'
        }}>
          <p>인증코드는 {currentRoomInfo.room_auth_code} 입니다.</p>
          <p>유효기간 : {currentRoomInfo.valid_time}</p>
        </div>
        <script>
        </script>
 
      </ModalLayout>
    </>
  );
};

/* DF */
SidePanel.defaultProps = {
  currentRoomInfo: null,
  userList: [],
  authCode: 0,
};
export default SidePanel;
