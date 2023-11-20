import { DeleteOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import React from 'react';

const VotingItem = ({ vote, handleRemoveVote, sendBroadcastVoteCommand }) => {
  const { id, subject = '질문', options = [1, 2, 3, 4, 5] } = vote;

  return (
    <div
      className="voting-item"
      onClick={() => {
        // openVote();
        sendBroadcastVoteCommand(vote);
      }}
    >
      <div className="title-box">
        <div className="title">{subject}</div>
        <div
          className="icon"
          onClick={() => {
            handleRemoveVote(id);
          }}
        >
          <DeleteOutlined />
        </div>
      </div>
      <div className="option-box">
        <Radio.Group>
          {options.map((opt) => {
            const { id, value } = opt;
            return (
              <Radio key={id} value={value} disabled>
                {value}
              </Radio>
            );
          })}
        </Radio.Group>
      </div>
    </div>
  );
};

export default VotingItem;
