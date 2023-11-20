import React from 'react';
import { Form, Input, Button } from 'antd';
import './Signup.css';
import { useHistory } from 'react-router';

const SignUpPresenter = ({ handleSignup }) => {
  /* Router */
  const history = useHistory();
  /* Functions */
  const handleSignUp = async (value) => {
    await handleSignup(value);
  };

  return (
    <div className="signup-container">
      <div className="signup-flex-box">
        <div className="signup-form-box">
          <div className="image-box">
            <h1>회원가입</h1>
          </div>
          <Form onFinish={handleSignUp}>
            <Form.Item
              name="user_name"
              // label="UserName"
              rules={[
                {
                  required: true,
                  message: '이름을 입력하세요!',
                },
              ]}
            >
              <Input size="large" placeholder="이름을 입력해주세요." />
            </Form.Item>
            <Form.Item
              name="user_account"
              // label="LoginID"
              rules={[
                {
                  required: true,
                  message: '이메일을 입력하세요!',
                },
                {
                  type: 'email',
                  message: '올바른 이메일 형식이 아닙니다 !',
                },
                {
                  vaildator: async (rule, value) => {
                    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                      throw new Error('올바른 이메일 형식이 아닙니다!');
                    }
                  }
                },
              ]}
            >
              <Input size="large" placeholder="이메일을 입력해주세요." />
            </Form.Item>
            <Form.Item
              name="user_pw"
              // label="Password"
              rules={[
                {
                  required: true,
                  message: '비밀번호를 입력하세요.',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                size="large"
                placeholder="비밀번호를 입력해주세요."
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              // label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: '비밀번호를 입력하세요.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('user_pw') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error('비밀번호가 일치하지 않습니다!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="비밀번호를 다시 입력해주세요"
                size="large"
              />
            </Form.Item>
            {/* <Form.Item
              name="user_tel"
              // label="Tel"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/),
                  message: '전화번호를 입력하세요.',
                },
              ]}
            >
              <Input placeholder="전화번호를 입력해주세요" size="large" />
            </Form.Item> */}
            <Form.Item size="large">
              <Button
                className="signup-form-button"
                type="primary"
                size="large"
                htmlType="submit"
              >
                계정 생성하기
              </Button>
            </Form.Item>
            <Form.Item size="large">
              <Button
                className="signup-form-reset"
                type="primary"
                size="large"
                htmlType="reset"
                danger
                onClick={() => history.goBack()}
              >
                취소하기
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPresenter;
