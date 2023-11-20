import { DeleteFilled, SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { VotingItem, OptionBox } from './components';
import React, { useState } from 'react';
import { v4 } from 'uuid';

const VotingPresenter = ({
  votes,
  subject,
  setSubject,
  options,
  setOptionText,
  handleInsertOption,
  handleRemoveOption,
  selectedOption,
  setSelectedOption,
  handleInsertVote,
  handleRemoveVote,
  sendBroadcastVoteCommand,
}) => {
  const [inputText, setInputText] = useState('');

  return (
    <div className="voting-container">
      <div className="voting-flex-box">
        <div className="insert-voting-box">
          <div className="question-box">
            <div className="left-item">
              <div className="input-box">
                <input
                  placeholder="내용을 입력해 주세요..."
                  className="insert-text-field"
                  size="large"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                  }}
                />
              </div>
              <div className="insert-box">
                <button
                  className="insert-btn"
                  size="large"
                  onClick={() => {
                    handleInsertOption();
                  }}
                >
                  + 항목추가
                </button>
                {/* <Button
                    className="delete-btn"
                    danger
                    type="primary"
                    icon={<DeleteOutlined />}
                    size="large"
                    onClick={() => {
                      handleRemoveOption();
                    }}
                  ></Button> */}
              </div>
            </div>
            <div
              className="right-item"
              onClick={() => {
                handleInsertVote(inputText);
                //NOTE API 요청 추가
                setInputText('');
              }}
            >
              <SendOutlined className="insert-icon" />
            </div>
          </div>

          <div className="option-box">
            {selectedOption ? (
              <div
                style={{
                  position: 'absolute',
                  right: '10px',
                }}
              >
                <Button
                  className="delete-btn"
                  danger
                  shape="circle"
                  type="primary"
                  icon={<DeleteFilled />}
                  size="middle"
                  onClick={() => {
                    handleRemoveOption();
                    setSelectedOption(null);
                  }}
                ></Button>
              </div>
            ) : (
              <></>
            )}
            <OptionBox
              options={options}
              setOptionText={setOptionText}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>
        </div>
        <div className="voting-list-box">
          {votes.map((v, i) => {
            return (
              <VotingItem
                key={v4()}
                vote={v}
                handleRemoveVote={handleRemoveVote}
                sendBroadcastVoteCommand={sendBroadcastVoteCommand}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VotingPresenter;
