import { PlayCircleFilled } from '@ant-design/icons';
import { DrawingBoard } from 'components';

import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
const DrawingBoardLayout = ({ participantElements }) => {
  /* state */
  const [videoToggle, setVideoToggle] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(0);

  /* redux state */
  const activeSheet = useSelector((state) => state.drawing.activeSheet);

  /* ref  */

  /* Hooks */
  const canvasRef = useCallback((node) => {
    setCanvasWidth(node?.offsetWidth);
  }, []);

  /* render */
  return (
    <div className="drawing-board-layout">
      <div className="drawing-board">
        <div className="canvas" id="drawingCanvas" ref={canvasRef}>
          {activeSheet.id === null ? (
            <div className="active-sheet-not-exist-alert">
              <span className="info-text">
                좌측 탭에서 시트를 선택해 주세요.
              </span>
            </div>
          ) : (
            <DrawingBoard
              width={canvasWidth}
              ratio={7 / 16}
              backgroundColor={'#fff'}
              stageClassName="drawing-board-stage"
            />
          )}
        </div>
        <div className="video-area">
          <div className="video-toggle-btn-box">
            {videoToggle ? (
              <PlayCircleFilled
                rotate={270}
                className="toggle-button collapsed"
                onClick={() => {
                  setVideoToggle(!videoToggle);
                }}
              />
            ) : (
              <PlayCircleFilled
                rotate={90}
                className="toggle-button"
                onClick={() => {
                  setVideoToggle(!videoToggle);
                }}
              />
            )}
          </div>
          {videoToggle ? (
            <></>
          ) : (
            <div className="participant-video">{participantElements}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawingBoardLayout;
