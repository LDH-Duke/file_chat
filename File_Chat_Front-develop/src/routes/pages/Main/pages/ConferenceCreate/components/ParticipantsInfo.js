import React from 'react';
import { List, Avatar, Checkbox } from 'antd';

const ParticipantsInfo = ({
  members,
  participant,
  setParticipant,
  userInfo,
}) => {
  /**
   * 선택된 유저수
   * --
   */
  const selectedLength = participant.length;
  /**
   * 참여자 조작
   * --
   * @param {*} e
   */
  const handleParticipant = (e) => {
    const user_id = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setParticipant([...participant, { user_id }]);
    } else {
      const temp = participant.filter((item) => {
        return item.user_id !== user_id;
      });
      setParticipant([...temp]);
    }
  };
  return (
    <>
      <h3 style={{ padding: '16px 24px', margin: 0 }}>
        참가자{' '}
        <small>
          (선택 {selectedLength}/{members.length}명)
        </small>
      </h3>

      {/*  */}
      <div style={{ padding: '0 10px 10px 10px' }}>
        <div
          style={{
            background: '#fafafa',
            border: '1px solid #e6e6e6',
            height: 500,
            overflowY: 'scroll',
          }}
        >
          <List
            dataSource={members}
            renderItem={(item) => (
              <List.Item
                key={item.user_id}
                className={
                  'conferenceCreate-userItem'
                  /* item.selected
                            ? 'conferenceCreate-userItem-selected'
                            : 'conferenceCreate-userItem' */
                }
                style={{
                  padding: '10px 24px 10px 24px',
                  alignItems: 'cenrer',
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.user_id}>
                      {item.user_nm.slice(0, 1)}
                    </Avatar>
                  }
                  // eslint-disable-next-line
                  title={<a>{item.user_nm}</a>}
                />
                <div>
                  <Checkbox
                    disabled={item.user_id === userInfo.user_id}
                    defaultChecked={item.user_id === userInfo.user_id}
                    value={item.user_id}
                    onChange={handleParticipant}
                  />
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ParticipantsInfo;
