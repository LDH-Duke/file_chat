import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router';
import './landing.css';

const LandingPresenter = (props) => {
  const history = useHistory();
  return (
    <div className="landing-wrapper">
      <div className="landing-container">
        <div className="landing-header">
          <div className="logo">logo</div>
          <div className="login">
            <Button
              style={{ backgroundColor: 'transparent', color: 'white' }}
              onClick={() => history.push('/signin')}
              size="large"
            >
              로그인
            </Button>
          </div>
        </div>
        <div className="visual-container">
          <div className="left">
            <div style={{ fontSize: '3rem' }}>
              회의실이 없어도, 강의실이 없어도
            </div>
            <div style={{ fontSize: '3rem' }}>
              <span style={{ fontWeight: 'bold', letterSpacing: '1.25rem' }}>
                Livecon
              </span>{' '}
              에서 바로 시작하세요
            </div>
            <div>
              <Button
                style={{ backgroundColor: 'transparent', color: 'white' }}
                size="large"
              >
                가입하기
              </Button>
            </div>
          </div>
          <div className="right">사진</div>
        </div>
        <div className="banner-container">
          <div className="banner-content">
            <div className="left">
              <div style={{ fontSize: '1rem' }}>라이브컨이 처음이신가요?</div>
              <div style={{ fontSize: '1.5rem' }}>
                무료로 체험하고 첫 가입고객 혜택도 받으세요
              </div>
            </div>

            <div className="right">
              <Button
                type="primary"
                style={{
                  width: '100%',
                  height: '100%',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
                onClick={() => history.push('/dashboard')}
              >
                체험하기
              </Button>
            </div>
          </div>
        </div>
        <div className="description">Description</div>
        <div className="letter">Letter</div>
        <div className="footer">footer</div>
      </div>
    </div>
  );
};

export default LandingPresenter;
