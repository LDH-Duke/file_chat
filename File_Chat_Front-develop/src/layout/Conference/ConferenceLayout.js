import React, { useEffect, useState } from 'react';
import { Layout, Menu, PageHeader } from 'antd';
import {
  FileTextFilled,
  FormOutlined,
  MenuOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';

import './ConferenceLayout.css';
import { useHistory, useLocation } from 'react-router';
import { batch, useDispatch, useSelector } from 'react-redux';
import { conferenceAction } from 'redux/module/conference';
import { drawingActions, drawingThunkActions } from 'redux/module/drawing';
import { Drawing, FileBoard, SideTab, Voting } from './components';
import { LCConferenceApi } from 'api';
import { documentActions } from 'redux/module/document';
import { votingActions } from 'redux/module/voting';

const { Content, Sider } = Layout;

const ConferenceLayout = ({ children }) => {
  /* Router */
  let history = useHistory();
  const { search } = useLocation();
  const [, conference_id] = search.split('?room=');

  /* Redux State */
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const activeMenu = useSelector((state) => state.conference.activeMenu);

  /* State */
  const [conference, setConference] = useState({
    conference_nm: '',
  });
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(true);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);

  /* Hooks */

  useEffect(() => {
    handleConfernceData();
    // eslint-disable-next-line
  }, [userInfo]);

  /* Functions */
  /**
   * @title 좌측 사이드바 토글 컨트롤러
   * @description 메뉴들을 선택했을 때 collapse 되는 것을 컨트롤
   * @param menu 선택된 메뉴
   */
  const handleContentLeftSidePanelCollapse = (menu) => {
    // 닫혀있으면 활성화하고, 선택된 메뉴로 변경
    if (leftPanelCollapsed) {
      setLeftPanelCollapsed(false);
      dispatch(conferenceAction.setActiveMenu(menu));
      handleChangeMenu(menu);
    }

    // 기존의 메뉴와 같은 메뉴가 선택되면
    if (menu === activeMenu) {
      // 패널 닫고 메뉴 NULL
      setLeftPanelCollapsed(true);
      dispatch(conferenceAction.setActiveMenu(null));
    } else {
      // 다른 메뉴가 선택되면 해당 메뉴로 체인지
      dispatch(conferenceAction.setActiveMenu(menu));
      handleChangeMenu(menu);
    }
  };

  /**
   * @title 메뉴 변경 처리
   * @description 메뉴 변경에 따른 각종 상태들을 처리한다.
   * @param menu 선택된 메뉴
   */
  const handleChangeMenu = (menu) => {
    batch(() => {
      initState();

      if (menu === 'drawing') {
        dispatch(conferenceAction.setDrawing(true));
        dispatch(drawingActions.selectFirstDrawingSheet());
        //FIXME DRAWING의 최초 리스트로
      } else if (menu === 'files') {
        dispatch(documentActions.setDocumentSharingMode(true));
        dispatch(drawingThunkActions.selectNowActiveDocumentSheet());
      }
    });
  };

  /**
   * @title 상태 초기화
   * @description 모드가 변경됨에 따라 각 상태들을 초기화 한다.
   */
  const initState = () => {
    dispatch(conferenceAction.setDrawing(false));
    dispatch(documentActions.setDocumentSharingMode(false));
  };

  /**
   * @title 라이브 데이터 갱신
   * @description 서버로 부터 해당 라이브의 정보를 수신하여 redux 상태 갱신
   * @async
   */
  const handleConfernceData = async () => {
    const result = await LCConferenceApi.getConferenceDetail(conference_id);
    if (result) {
      const { conference, assets, survey } = result;
      setConference(conference);
      if (assets.length !== 0) {
        assets.forEach((asset) => {
          const { assets_nm, assets_content } = asset;
          const newAssets = {
            fileName: assets_nm,
            imageUrlList: assets_content,
          };
          dispatch(documentActions.addDocument(newAssets));
        });
      }
      if (survey.length !== 0) {
        survey.forEach((item) => {
          const { title, replys } = item;
          const newSurvey = {
            subject: title,
            options: replys,
          };
          dispatch(votingActions.insertVote(newSurvey));
        });
      }
    }
  };

  /* Render */
  return (
    <Layout>
      <Layout className="confenrence-layout">
        {/* 최상단 헤더 */}
        <PageHeader
          className="broadcast-page-header"
          onBack={() => {
            history.goBack();
          }}
          title={conference.conference_nm}
          extra={[
            <MenuOutlined
              className="toggle-button"
              onClick={() => {
                setRightPanelCollapsed(!rightPanelCollapsed);
              }}
            />,
          ]}
          style={{
            height: '64px',
            minHeight: '64px',
            backgroundColor: 'rgb(52 52 52)',
            color: '#fff',
          }}
        ></PageHeader>
        <Layout className="broadcast-page-content">
          {/* 사이드 메뉴바 */}
          <Sider
            className="left-side-bar"
            collapsible={false}
            collapsed={true}
            style={{ backgroundColor: '#343434' }}
          >
            <Menu
              theme="dark"
              style={{ backgroundColor: '#343434' }}
              selectedKeys={activeMenu}
            >
              <Menu.Item
                key="files"
                title=""
                onClick={() => {
                  handleContentLeftSidePanelCollapse('files');
                }}
              >
                <FileTextFilled className="icon" />
              </Menu.Item>
              <Menu.Item
                key="survey"
                title=""
                onClick={() => {
                  handleContentLeftSidePanelCollapse('survey');
                }}
                style={
                  {
                    // display: isModerator ? 'block' : 'none',
                  }
                }
              >
                <OrderedListOutlined className="icon" />
              </Menu.Item>
              <Menu.Item
                key="drawing"
                title=""
                onClick={() => {
                  handleContentLeftSidePanelCollapse('drawing');
                }}
              >
                <FormOutlined className="icon" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Sider
              className="left-inner-side-bar"
              collapsedWidth={0}
              collapsed={leftPanelCollapsed}
              style={{ color: '#fff', backgroundColor: '#616161' }}
            >
              {activeMenu === 'files' && <FileBoard />}
              {activeMenu === 'survey' && <Voting />}
              {activeMenu === 'drawing' && <Drawing />}
            </Sider>
            <Content>{children}</Content>
          </Layout>
        </Layout>
      </Layout>
      <Sider
        className="right-side-bar"
        width={'25%'}
        collapsed={rightPanelCollapsed}
        collapsedWidth={0}
        onCollapse={(v) => {
          setRightPanelCollapsed(v);
        }}
      >
        <SideTab />
      </Sider>
    </Layout>
  );
};

export default ConferenceLayout;
