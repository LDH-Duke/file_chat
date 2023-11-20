import { Button, Popconfirm, Select, Space, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
const { Option } = Select;
const ParticipantModify = ({
  userInfo,
  participant,
  members,
  handleParticipant,
}) => {
  return (
    <>
      <Space style={{ width: '100%' }} align="">
        <Typography.Title level={3} style={{ width: '150px' }}>
          참여인원
        </Typography.Title>
        <Typography.Paragraph style={{ width: '950px' }}>
          <Select
            showSearch
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            className="w-100"
            placeholder="유저를 선택해 주세요"
            style={{ marginBottom: '0.5vh' }}
            allowClear
            onChange={(e, t) =>
              handleParticipant({ user_id: t.key, user_nm: t.value }, true)
            }
          >
            {members.map((item) => {
              const { user_id, user_nm } = item;
              return (
                <Option
                  key={user_id}
                  value={user_nm}
                  disabled={
                    participant.filter((item) => item.user_id === user_id)
                      .length !== 0
                      ? true
                      : false
                  }
                >
                  {user_nm}
                </Option>
              );
            })}
          </Select>
          <Space
            className="w-100"
            wrap
            style={{
              border: '1px solid lightgray',
              padding: '0.5rem',
            }}
          >
            {participant.map((item) => {
              const { user_id, user_nm } = item;
              return (
                <Popconfirm
                  disabled={user_id === userInfo.user_id}
                  key={user_id}
                  placement="top"
                  title={`${user_nm}님을 삭제하시겠습니까?`}
                  okText="네"
                  cancelText="아니오"
                  onConfirm={() => handleParticipant(user_id)}
                >
                  <Button
                    shape="round"
                    style={{
                      padding: '0.5rem',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      textAlign: 'left',
                    }}
                  >
                    <Space>
                      <Avatar>{user_nm.slice(0, 1)}</Avatar>
                      {user_nm}
                    </Space>
                  </Button>
                </Popconfirm>
              );
            })}
          </Space>
        </Typography.Paragraph>
      </Space>
    </>
  );
};

export default ParticipantModify;
