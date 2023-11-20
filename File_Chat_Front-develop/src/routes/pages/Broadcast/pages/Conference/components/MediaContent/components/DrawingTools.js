import {
  CloseCircleFilled,
  DownCircleTwoTone,
  RedoOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import PENCIL_ICON from 'assets/svg/pencil.svg';
import ERASER_ICON from 'assets/svg/eraser.svg';
// import { actions } from 'redux/module/conference';

import React, { useState } from 'react';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';

const DrawingTools = () => {
  //eslint-disable-next-line
  const isDrawing = useSelector((state) => state.conference.isDrawing);
  const [toolToggle, setToolToggle] = useState(false);

  const handleCloseTool = () => {
    setToolToggle(false);
  };

  return toolToggle ? (
    <div className="drawing-tools-contaier">
      <div className="drawing-tools-flex-box">
        <div className="history-menu menu-box">
          <div className="menu">
            <UndoOutlined className="history-item" />
          </div>
          <div className="menu">
            <RedoOutlined className="history-item" />
          </div>
        </div>
        <div className="vertical-hr"></div>
        <div className="color-menu menu-box">
          <div className="menu">
            <span className="color-item" id="red"></span>
          </div>
          <div className="menu">
            <span className="color-item" id="orange"></span>
          </div>
          <div className="menu">
            <span className="color-item" id="yellow"></span>
          </div>
          <div className="menu">
            <span className="color-item" id="green"></span>
          </div>
          <div className="menu">
            <span className="color-item" id="blue"></span>
          </div>
          <div className="menu">
            <span className="color-item" id="pink"></span>
          </div>
        </div>
        <div className="vertical-hr"></div>
        <div className="tool-menu menu-box">
          <div className="menu">
            <img src={PENCIL_ICON} alt="pencil_icon" />
          </div>
          <div className="menu">
            <img src={ERASER_ICON} alt="eraser_icon" />
          </div>
        </div>
        <div className="vertical-hr"></div>
        <div className="interface-menu menu-box">
          <div className="menu">
            <CloseCircleFilled
              id="closeBtn"
              onClick={() => {
                handleCloseTool();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="drawing-tools-toggle">
      <div className="panel-toggle-button">
        <DownCircleTwoTone
          twoToneColor="#6480e3"
          onClick={() => {
            setToolToggle(true);
          }}
        />
      </div>
    </div>
  );
};

export default DrawingTools;
