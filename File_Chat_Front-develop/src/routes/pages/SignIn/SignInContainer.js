/* eslit-disable */
/**
 *
 *
 */

import { API } from 'api';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MessageAlert, setCookie } from 'utils';
import SignInPresenter from './SignInPresenter';
import { actions as UserActions } from 'redux/module/userInfo';
import { useDispatch, useSelector } from 'react-redux';

const SiginInContainer = () => {
  /* Router */
  const history = useHistory();

  /* State */
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  /* Hooks */
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      MessageAlert.warning('이미 로그인되어 있습니다.');
      history.push('/messenger');
    } // eslint-disable-next-line
  }, [userInfo]);

  /* Functions */
  const handleLogin = async (userInfo) => {
    // console.log('userInfo: ', userInfo);
    // return;
    const { status, data } = await API.login(userInfo);

    if (status !== 200) {
      return MessageAlert.error('계정정보를 확인해주세요');
    }

    if (data) {
      await setCookie('token', JSON.stringify(data));
      await setCookie('userInfo', JSON.stringify(data));
      await setCookie('userId', JSON.stringify(data.user_id));
      await dispatch(UserActions.setSession({ users: data }));
      history.push('/messenger');
      return true;
    }
    MessageAlert.error('로그인에 실패했습니다.');
    return false;
  };

  const handleSignUp = () => {
    history.push('/signup');
  };
  return (
    <SignInPresenter handleLogin={handleLogin} handleSignUp={handleSignUp} />
  );
};

export default SiginInContainer;
