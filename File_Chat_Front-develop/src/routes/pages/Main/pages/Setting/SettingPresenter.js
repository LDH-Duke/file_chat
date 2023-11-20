import { Button, Radio } from 'antd';
import React from 'react';
import { Attachment, Question } from './components';

import { BASIC, INTERVIEW, LECTURE } from 'assets/images/layout';
import './Setting.css';
import { useHistory } from 'react-router-dom';

const SettingPresenter = ({
  streamingCategory,
  setstreamingCategory,
  handlerJoinConference,
}) => {
  const history = useHistory();

  return (
    <div className="setting-container">
      <div className="setting-flex-box">
        <div className="category-area streaming-category-area">
          <div className="step-title">
            스트리밍 <br /> 유형
          </div>
          <div className="step-content">
            <Radio.Group
              onChange={(e) => {
                setstreamingCategory(e.target.value);
              }}
              value={streamingCategory}
            >
              <div className="category-box">
                <Radio value={'BASIC'}>
                  <div className="category-content">
                    <div className="category-image">
                      <img src={BASIC} alt="" />
                    </div>
                    <div className="category-name">기본</div>
                  </div>
                </Radio>
              </div>
              <div className="category-box">
                <Radio value={'LECTURE'}>
                  <div className="category-content">
                    <div className="category-image">
                      <img src={LECTURE} alt="" />
                    </div>
                    <div className="category-name">강의</div>
                  </div>
                </Radio>
              </div>

              <div className="category-box">
                <Radio value={'INTERVIEW'}>
                  <div className="category-content">
                    <div className="category-image">
                      <img src={INTERVIEW} alt="" />
                    </div>
                    <div className="category-name">인터뷰</div>
                  </div>
                </Radio>
              </div>
            </Radio.Group>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="category-area attachment-area">
          <div className="step-title">첨부파일</div>
          <div className="step-content">
            <Attachment />
          </div>
        </div>
        <hr className="hr-line" />
        <div className="category-area qna-area">
          <div className="step-title">질문/투표</div>
          <div className="step-content">
            <Question />
          </div>
        </div>
      </div>

      <div className="footer-interface-box">
        <Button
          danger
          type="primary"
          size="large"
          onClick={() => {
            history.push('/m/join');
          }}
        >
          {' '}
          &#60; 나가기
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            handlerJoinConference();
          }}
        >
          시작 &#62;
        </Button>
      </div>
    </div>
  );
};

export default SettingPresenter;
