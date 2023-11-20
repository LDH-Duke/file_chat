import React, { useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Stage, Layer, Line } from 'react-konva';

const Sheet = ({ sheet, handleClickSheet }) => {
  const activeSheet = useSelector((state) => state.drawing.activeSheet);
  const moderateActiveSheetId = useSelector(
    (state) => state.drawing.moderateActiveSheetId
  );

  const active = activeSheet.id === sheet.id;
  const moderateActive = moderateActiveSheetId === sheet.id;
  const thumbnailLines = sheet.lines.map((line, idx) => {
    return (
      <Line
        key={idx}
        points={line.points}
        stroke="#aaa"
        strokeWidth={5}
        tension={0.5}
        lineCap="round"
      />
    );
  });

  const canvasRef = useRef(null);
  const [thumbnailSize, setThumbnailSize] = useState({
    width: 0,
    height: 0,
    scale: 0,
  });

  useLayoutEffect(() => {
    setThumbnailSize({
      width: canvasRef.current.offsetWidth,
      height: (canvasRef.current.offsetWidth / 16) * 7,
      scale: canvasRef.current.offsetWidth / 1600,
    });
    return () => {
      setThumbnailSize({
        width: 0,
        height: 0,
        scale: 0,
      });
    };
  }, [activeSheet]);

  return (
    <div
      className={`sheet-box ${active ? 'me-active' : ''} ${
        moderateActive ? 'moderate-active' : ''
      }`}
      onClick={() => {
        handleClickSheet(sheet);
      }}
    >
      <div className="thumbnail-box" ref={canvasRef}>
        <Stage
          width={thumbnailSize.width}
          height={thumbnailSize.height}
          scaleX={thumbnailSize.scale}
          scaleY={thumbnailSize.scale}
          listening={false}
        >
          <Layer>{thumbnailLines}</Layer>
        </Stage>
      </div>
      {/* <div className="badge me-active">ME</div>
      <div className="badge moderate-active">OWNER</div> */}
    </div>
  );
};

export default React.memo(Sheet);
