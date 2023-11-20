/**
 *
 *
 */

import React, { useState } from 'react';
import {
  Sidebar,
  Search,
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
import ChatList from './ChatList';
import { ModalLayout, Col, Row } from 'components';
import { Button, Form, Input, Switch, Select, Empty } from 'antd';
import {} from 'components';
import { useEffect } from 'react';
import { MessageAlert } from 'utils';
import { useHistory } from 'react-router-dom';

const { Option } = Select;
const styles = {
  formItem: {
    marginBottom: 10,
  },
};
const initData = {
  room_id: null,
  room_name: '',
  room_storage: false,
  room_ftpid: '',
  room_ftppw: '',
  room_ftpip: '',
  room_ftpport: 21,
  room_ftptype: 'ftp',
  room_description: '',
};

/**
 * [Component] 채팅 사이드바
 * --
 */
const ChatSidebar = ({
  userInfo,
  roomList,
  userList,
  currentRoom,
  onChangeRoom,
  onCreateRoom,
}) => {
  /* ===== INITIAL ===== */
  const history = useHistory();
  const [form] = Form.useForm();

  /* ===== STATE ===== */
  const [createModal, setCreateModal] = useState(false);
  const [inviteList, setInviteList] = useState(
    userInfo ? [String(userInfo.user_id)] : null
  );
  const [data, setData] = useState(initData);

  /* ===== FUNCTIONS ===== */
  /**
   * 멤버 입력 함수
   * --
   * @param {*} value
   */
  const handleChangeInviteList = (value) => {
    setInviteList(value);
  };

  /**
   * on change
   * --
   */
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * 채팅방 생성
   * --
   */
  const handleCreateRoom = async () => {
    const result = await onCreateRoom(data, inviteList);
    if (result) {
      // 초기화
      setCreateModal(false);
      setData(initData);
      setInviteList([]);
    }
  };

  /* ===== Hooks ===== */
  useEffect(() => {
    if (!userInfo) {
      MessageAlert.warning('로그인 후 이용가능합니다.');
      history.replace('/signin');
    }
  }, [userInfo]);

  /* ===== RENDER ===== */
  return (
    <>
      <Sidebar position="left" scrollable={true}>
        <Row>
          <Col x={24} style={{ padding: '10px 10px 3px 10px' }}>
            <Button block type="default" onClick={() => setCreateModal(true)}>
              채팅생성
            </Button>
          </Col>
        </Row>
        <Search placeholder="Search..." />
        {roomList && roomList.length > 0 ? (
          <ChatList
            roomList={roomList}
            currentRoom={currentRoom}
            onChangeRoom={onChangeRoom}
          />
        ) : (
          <Empty description="채팅이 없습니다." />
        )}
      </Sidebar>

      {/* === 생성 모달 === */}
      <ModalLayout
        // type={'drawer'}
        title={'새 채팅'}
        width={540}
        visible={createModal}
        onOk={() => setCreateModal(false)}
        onCancel={() => setCreateModal(false)}
        style={{ top: 70 }}
        bodyStyle={{ padding: 20 }}
        footer={
          <div
            style={{
              textAlign: 'right',
              width: '100%',
            }}
          >
            <Button
              size={'large'}
              onClick={() => setCreateModal(false)}
              style={{ width: '29%' }}
            >
              취소
            </Button>
            <Button
              size={'large'}
              type="primary"
              style={{ width: '69%' }}
              onClick={handleCreateRoom}
            >
              생성완료
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          {/* 채팅명 */}
          <Form.Item label="채팅명" style={styles.formItem}>
            <Input
              name="room_name"
              placeholder="채팅명을 입력해주세요"
              value={data.room_name}
              onChange={handleChange}
            />
          </Form.Item>

          {/* 설명 */}
          <Form.Item label="설명" style={styles.formItem}>
            <Input
              name="room_description"
              placeholder="내용을 입력해주세요"
              value={data.room_description}
              onChange={handleChange}
            />
          </Form.Item>

          {/* 멤버 */}
          <Form.Item label="멤버" style={styles.formItem}>
            <Select
              mode="tags"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select"
              defaultValue={userInfo ? [String(userInfo.user_account)] : []}
              onChange={handleChangeInviteList}
            >
              {/* {userList.map((item) => (
                <Option key={`${item.user_id}`}>{item.user_account}</Option>
              ))} */}
            </Select>
          </Form.Item>

          {/* 외부 스토리지 */}
          <Form.Item
            label="외부 스토리지"
            style={{ ...styles.formItem, marginBottom: 5 }}
          >
            <Switch
              defaultChecked
              onChange={(value) =>
                handleChange({ target: { name: 'room_storage', value } })
              }
              checked={data.room_storage}
            />
          </Form.Item>
        </Form>
        {data.room_storage && (
          <Form
            form={form}
            layout="vertical"
            style={{ padding: 8, background: '#f1f1f1' }}
          >
            {/*  */}
            <Form.Item label="FTP서버" style={styles.formItem}>
              <Select
                defaultValue="ftp"
                value={data.room_ftptype}
                options={[
                  { value: 'sftp', label: 'SFTP' },
                  { value: 'ftp', label: 'FTP' },
                ]}
                onChange={(value) =>
                  handleChange({ target: { name: 'room_ftptype', value } })
                }
                style={{
                  width: '20%',
                }}
              />
              <Input
                name="room_ftpip"
                placeholder="FTP 주소를 입력해주세요"
                value={data.room_ftpip}
                onChange={handleChange}
                style={{
                  width: '79%',
                  marginLeft: '1%',
                }}
              />
            </Form.Item>
            {/*  */}
            <Form.Item label="저장경로" style={styles.formItem}>
              <Input
                name="room_ftppath"
                placeholder="저장경로를 입력해주세요"
                value={data.room_ftppath}
                onChange={handleChange}
              />
            </Form.Item>
            {/*  */}
            <Form.Item label="계정" style={styles.formItem}>
              <Input
                name="room_ftpid"
                placeholder="FTP 아이디를 입력해주세요"
                value={data.room_ftpid}
                onChange={handleChange}
              />
            </Form.Item>
            {/*  */}
            <Form.Item
              label="패스워드"
              style={{ ...styles.formItem, marginBottom: 3 }}
            >
              <Input
                name="room_ftppw"
                placeholder="FTP 패스워드를 입력해주세요"
                value={data.room_ftppw}
                onChange={handleChange}
              />
            </Form.Item>
            {/*  */}
            <Form.Item label="포트" style={styles.formItem}>
              <Input
                name="room_ftpport"
                placeholder="포트를 입력해주세요"
                value={data.room_ftpport}
                onChange={handleChange}
              />
            </Form.Item>
          </Form>
        )}
      </ModalLayout>
    </>
  );
};

ChatSidebar.defaultProps = {
  userInfo: null,
  userList: [],
  onCreateRoom: () => {},
};
export default ChatSidebar;
