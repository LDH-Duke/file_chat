/**
 *
 *
 */

import './MainLayout.css';
import { useEffect, useState } from 'react';
import { Layout, Menu, Button, Dropdown, Space, Typography } from 'antd';
import {
  UserOutlined,
  // PlusOutlined,
  // AppstoreAddOutlined,
  UsergroupAddOutlined,
  SelectOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  // setCookie,
  deleteCookie,
  getCookie,
} from 'utils';
import { useSelector } from 'react-redux';

const { Header, Content } = Layout;

/**
 *
 */
const getRouter = (path) => {
  const p = path.split('/');
  return p[1];
};

/**
 *
 */
const MainLayout = ({ children }) => {
  /* ===== Router ===== */
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  /* ===== State ===== */
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  // const [userInfo, setUserInfo] = useState(undefined);
  const [thisTab, setThisTab] = useState('dashboard');
  // eslint-disable-next-line
  const [tabMenus, _] = useState([
    {
      key: 'messenger',
      route: '/messenger',
      title: 'Mssenger',
    },
    {
      key: 'explorer',
      route: '/explorer',
      title: 'Invite',
    },
  ]);

  /* ===== Hooks ===== */
  useEffect(() => {
    setThisTab(getRouter(pathname));
  }, [pathname]);

  /* ===== Functions ===== */
  /**
   * 로그아웃
   * --
   */
  const logout = async () => {
    deleteCookie('token');
    deleteCookie('userInfo');
    deleteCookie('userId');
    window.location.href = '/signin';
  };

  /**
   * 헤더사용
   * --
   */
  const handleUseHeader = (path) => {
    const [, test] = path.split('/');
    if (test === 'conclusion') {
      return false;
    }
    switch (path) {
      case '/create/group':
      case '/create/conference':
      case '/modify/conference':
        return false;
      default:
        return true;
    }
  };

  /**
   * 유저 드랍다운메뉴
   */
  const userDropdownMenus = (
    <Menu size="large">
      <Menu.Item size="large">
        <Link to="/signup">
          <UsergroupAddOutlined /> 회원가입
        </Link>
      </Menu.Item>
      <Menu.Item size="large">
        <Link to="/signin">
          <SelectOutlined /> 로그인
        </Link>
      </Menu.Item>
    </Menu>
  );

  /**
   * 로그인 후 드랍다운메뉴
   */
  const sessionDropdownMenus = userInfo && (
    <Menu size="large">
      <Menu.Item size="large">
        <Link to="/">
          <UserOutlined /> 마이페이지
        </Link>
      </Menu.Item>
      <Menu.Item size="large" onClick={logout}>
        <LogoutOutlined /> 로그아웃
      </Menu.Item>
    </Menu>
  );

  const useHeader = handleUseHeader(pathname);

  /* ===== Hooks ===== */
  useEffect(() => {
    const call = () => {
      const userInfo = getCookie('userInfo');
      if (userInfo) {
        if (pathname === '/' || pathname === '/signin') {
          history.push('/messenger');
        }
      } else {
        alert('logout');
        if (pathname !== '/signin') {
          window.location.href = '/signin';
        }
      }
    };
    call();
  }, []);

  /* ===== RENDER ===== */
  return (
    <Layout className="main-layout" style={{ height: '100%' }}>
      {useHeader === true && (
        <Header className="header">
          <Link className="logo" to="/messenger" tag="div">
            FileChat
          </Link>
          <div className="main-navigator">
            {tabMenus.map((menu) => (
              <Link
                key={menu.key}
                to={menu.route}
                className={`navi-item ${thisTab === menu.key && 'active'}`}
              >
                {menu.title}
              </Link>
            ))}
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            style={{ width: '20%', textAlign: 'right', border: 'none' }}
          >
            <Menu.Item className="header-menu-item">
              <Space>
                <Dropdown
                  overlay={userInfo ? sessionDropdownMenus : userDropdownMenus}
                  placement="bottomRight"
                  trigger="click"
                >
                  <Button
                    size="large"
                    type="primary"
                    id="accountBtn"
                    icon={<UserOutlined />}
                    shape="circle"
                    style={{
                      marginRight: 0,
                    }}
                  />
                </Dropdown>
                <Typography style={{ color: 'white' }}>
                  {userInfo ? userInfo.user_nm : ''}
                </Typography>
              </Space>
            </Menu.Item>
          </Menu>
        </Header>
      )}
      <Content
        className="main-layout-content"
        style={{ width: '100%', background: '#f0f2f5' }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
