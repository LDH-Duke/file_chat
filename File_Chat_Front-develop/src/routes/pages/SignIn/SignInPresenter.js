/* eslit-disable */
/**
 *
 *
 *
 */

import React from 'react';
import { Form, Input, Button, Divider, Space } from 'antd';
import { Link, useHistory } from 'react-router-dom';
// import TITLE from 'assets/svg/title.svg';
import './SignIn.css';

/**
 * [Component] Presenter
 * --
 */
const SignInPresenter = ({ handleLogin, handleSignUp }) => {
  /* ===== Router ===== */
  const history = useHistory();

  /* ===== Functions ===== */
  const signin = async (userInfo) => {
    await handleLogin(userInfo);
  };

  /* ===== Render ===== */
  return (
    <div className="signin-container">
      <div className="signin-flex-box">
        {/* <div className="signin-title-box">
          <img src={TITLE} alt="title" />
        </div> */}
        <div className="login-form-box" style={{ maxWidth: 450 }}>
          <div className="image-box">
            <Link className="logo" to="/" tag="h2" style={{ color: '#333' }}>
              Sign in
            </Link>
          </div>
          <Form onFinish={signin}>
            <Form.Item name="user_account">
              <Input size="large" placeholder="Email" />
            </Form.Item>
            <Form.Item name="user_pw">
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>
            <Form.Item size="large">
              <Button
                className="login-form-button"
                type="primary"
                size="large"
                htmlType="submit"
              >
                로그인
              </Button>
              <Divider
                style={{
                  color: '#b1b1b1',
                }}
                plain
              >
                OR
              </Divider>

              <Space style={{ width: '100%' }} direction="vertical">
                <Button
                  onClick={() => history.push('/signup')}
                  block
                  size="large"
                  style={{
                    border: '0.5px solid #3589d4',
                    color: '#3589d4',
                    fontWeight: 'bold',
                  }}
                >
                  회원가입
                </Button>
                {/* <Button
                  block
                  style={{
                    border: 'solid 0.5px #40b733',
                    color: '#40b733',
                    fontWeight: 'bold',
                  }}
                >
                  네이버
                </Button>
                <Button
                  block
                  style={{
                    border: 'solid 0.5px #c9ae22',
                    color: '#c9ae22',
                    fontWeight: 'bold',
                  }}
                >
                  카카오
                </Button>
                <Button
                  block
                  style={{
                    border: 'solid 0.5px #c83328',
                    color: '#c83328',
                    fontWeight: 'bold',
                  }}
                >
                  Google
                </Button> */}
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignInPresenter;
