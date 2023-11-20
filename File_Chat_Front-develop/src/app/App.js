import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import Routes from 'routes';
import { getCookie } from 'utils';
import { actions as UserActions } from 'redux/module/userInfo';
import './App.css';

const App = () => {
  /* Router */
  // const history = useHistory();
  const location = useLocation();

  /* Hooks */
  const dispatch = useDispatch();
  useEffect(() => {
    getSession();
    // eslint-disable-next-line
  }, [location]);

  /* Functions */
  const getSession = async () => {
    const tokenData = getCookie('token');
    const userInfoData = getCookie('userInfo');
    if (tokenData) {
      const token = tokenData;
      const userInfo = await JSON.parse(userInfoData);
      dispatch(
        UserActions.setSession({
          token,
          userInfo,
        })
      );
      return true;
    }
    // history.push('/signin');
  };
  return <Routes />;
};

export default App;
