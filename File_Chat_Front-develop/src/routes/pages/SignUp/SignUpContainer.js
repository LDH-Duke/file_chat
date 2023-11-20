import { API } from 'api';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { MessageAlert } from 'utils';
import SignUpPresenter from './SignUpPresenter';

const SignUpContainer = () => {
  /* ===== Router ===== */
  const history = useHistory();
  /* ===== State ===== */
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  /* ===== Hooks ===== */
  /**
   * 로그인 체크
   * --
   */
  useEffect(() => {
    if (userInfo) {
      MessageAlert.warning('이미 로그인되어 있습니다.');
      history.push('/messenger');
    }
    // eslint-disable-next-line
  }, [userInfo]);

  /* ===== Functions ===== */
  /**
   * 회원가입 핸들러
   * --
   * @param {*} userInfo
   * @returns
   */
  const handleSignup = async (userInfo) => {
    const { status } = await API.join(userInfo);
    if (status === 200) {
      MessageAlert.success('가입되었습니다.');
      history.push('/signin');
      return true;
    }

    MessageAlert.error('회원가입에 실패했습니다. 다시 시도해주세요.');
    return false;
  };

  /**
   * 휴대폰번호 핸들러
   * --
   */
  // eslint-disable-next-line
  const handleTel = async (str) => {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if (str.length < 4) {
      return str;
    } else if (str.length < 7) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3);
      return tmp;
    } else if (str.length < 11) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 3);
      tmp += '-';
      tmp += str.substr(6);
      return tmp;
    } else {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 4);
      tmp += '-';
      tmp += str.substr(7);
      return tmp;
    }
  };

  return <SignUpPresenter handleSignup={handleSignup} />;
};

export default SignUpContainer;
