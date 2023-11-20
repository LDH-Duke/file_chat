import { PlusOutlined } from '@ant-design/icons';
import React, { useMemo } from 'react';
import Sheet from './components/Sheet';

const DrawingPresenter = ({
  sheets,
  activeSheet,
  handleClickSheet,
  handleInsertNewSheet,
}) => {
  const sheetComponents = useMemo(() => {
    return sheets.map((sheet, idx) => {
      return (
        <Sheet key={idx} sheet={sheet} handleClickSheet={handleClickSheet} />
      );
    });
    //eslint-disable-next-line
  }, [sheets]);

  return (
    <div className="drawing-container">
      <div className="drawing-flex-box">
        <div className="sheet-list">
          {sheetComponents}
          <div
            className="sheet-box add-sheet-item"
            onClick={() => {
              handleInsertNewSheet();
            }}
          >
            <span className="add-mark">
              <PlusOutlined />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingPresenter;
