import produce from 'immer';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Layer, Line, Stage } from 'react-konva';
import { batch, useDispatch, useSelector } from 'react-redux';
import { drawingActions } from 'redux/module/drawing';
import { DRAWING_TO_SHEET } from 'utils/jitsi/events/customCommand';
import JitsiManager from 'utils/jitsi/JitsiManager';
import { v1 } from 'uuid';

const jitsiManager = new JitsiManager();

const DrawingBoard = ({
  width,
  height,
  ratio,
  backgroundColor,
  stageClassName,
}) => {
  /* states */
  const [lastLine, setLastLine] = useState({ points: [] });
  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
    scale: 0,
    reverseScale: 0,
    scaleY: null,
    reverseScaleY: null,
  });

  /* redux states */
  const dispatch = useDispatch();
  const activeSheet = useSelector((state) => state.drawing.activeSheet);
  const tool = useSelector((state) => state.drawingTool.tool);
  const localUserId = useSelector((state) => state.localUser.id);

  const { lines } = activeSheet;

  /* Ref */
  const drawingState = useRef(false);
  const lastLineId = useRef(null);

  /* Hooks */
  useEffect(() => {
    const newCanvasSize = calcCanvasSize(width);
    setCanvasSize(newCanvasSize);
    return () => {};
    // eslint-disable-next-line
  }, [width, height]);

  const lineElements = useMemo(() => {
    return lines.map((line, i) => (
      <Line
        key={i}
        points={line.points}
        stroke={'#aaa'}
        strokeWidth={5}
        tension={0.5}
        lineCap="round"
        globalCompositeOperation={
          line.tool === 'eraser' ? 'destination-out' : 'source-over'
        }
      />
    ));
  }, [lines]);

  const lastLineElement = useMemo(
    () => (
      <Line
        key={'last'}
        points={lastLine.points}
        stroke="#00bbff"
        strokeWidth={5}
        tension={0.5}
        lineCap="round"
      />
    ),
    [lastLine]
  );

  /* Variable */

  /* Functions */
  /**
   * @title 캔버스 사이즈 계산
   * @description 변화된 width 값을 기준으로 비율(ratio)에 맞춰 height 계산, 1920을 기준으로 scale 계산
   * @param width 부모 컴포넌트 width 값
   */
  const calcCanvasSize = (width) => {
    return {
      width: width,
      scale: width / 1920,
      reverseScale: 1920 / width,
      height: height ? height : width * ratio,
      scaleY: height ? height / 1080 : null,
      reverseScaleY: height ? 1080 / height : null,
    };
  };

  /**
   * @title 선긋기 시작 이벤트 처리
   * @description 새로운 선을 긋는 시작점에 대한 처리, lastLine을 갱신하고, lines에 새로운 선을 추가한다.
   */
  const handleMouseDown = (e) => {
    drawingState.current = true;
    const newLineId = (lastLineId.current = v1());
    const pos = e.target.getStage().getPointerPosition();

    let newLine = {
      id: newLineId,
      tool,
      points: [
        pos.x * canvasSize.reverseScale,
        pos.y * (canvasSize.reverseScaleY ?? canvasSize.reverseScale),
      ],
    };

    batch(() => {
      dispatch(drawingActions.setLines([...lines, newLine]));
      setLastLine(newLine);
    });
  };
  /**
   * @title 선 긋기 이벤트 처리
   * @description 드로잉 선긋기 중 발생하는 이벤트를 처리한다. 수집되는 point를 배열에 저장하고,
   * 저장한 배열을 lastLine 상태에 갱신
   */
  const handleMouseMove = (e) => {
    if (!drawingState.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    // 새롭게 인식되는 포인트들을 삽입한다.
    const newPoint = produce(lastLine, (draftLastLine) => {
      draftLastLine.points = draftLastLine.points.concat([
        point.x * canvasSize.reverseScale,
        point.y * (canvasSize.reverseScaleY ?? canvasSize.reverseScale),
      ]);
    });
    setLastLine(newPoint);
  };

  /**
   * @title 선 긋기 완료 이벤트 처리
   * @description 드로잉 선긋기가 끝난 경우 (마우스 클릭을 뗀 경우) 발생하는 이벤트를 처리한다.
   * setTargetLine을 호출해 긋고 있는 선에 대해서 갱신을 마치고, lastLine을 초기화 하고,
   * jitsi 를 통해서 드로잉 데이터를 공유한다.
   */
  const handleMouseUp = () => {
    const attributes = {
      sheetId: activeSheet.id,
      lastLine: JSON.stringify(lastLine),
    };

    jitsiManager.sendCommand(DRAWING_TO_SHEET, {
      value: localUserId,
      attributes,
      children: lastLine,
    });

    batch(() => {
      dispatch(drawingActions.setTargetLine(lastLineId.current, lastLine));
      setLastLine({
        points: [],
      });
    });

    drawingState.current = false;
    lastLineId.current = null;
  };

  return (
    <Stage
      className={stageClassName}
      width={canvasSize.width}
      height={canvasSize.height}
      scaleX={canvasSize.scale}
      scaleY={canvasSize.scaleY ?? canvasSize.scale}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        backgroundColor,
      }}
    >
      <Layer>
        {lineElements}
        {lastLineElement}
      </Layer>
    </Stage>
  );
};

DrawingBoard.defaultProps = {
  width: 1920,
  height: null,
  ratio: 0.75,
  backgroundColor: null,
  stageClassName: 'drawing-board-stage',
  sendDrawingData: () => {},
};

export default DrawingBoard;
