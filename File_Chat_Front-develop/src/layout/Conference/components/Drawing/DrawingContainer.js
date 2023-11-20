import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drawingActions } from 'redux/module/drawing';
import JitsiManager from 'utils/jitsi/JitsiManager';
import DrawingPresenter from './DrawingPresenter';
import { initialState } from 'redux/module/drawing';
import { v4 } from 'uuid';
import { ADD_DRAWING_SHEET } from 'utils/jitsi/events/customCommand';

const jitsiManager = new JitsiManager();

const DrawingContainer = () => {
  /* States */
  const localUserId = useSelector((state) => state.localUser.id);
  const sheets = useSelector((state) => state.drawing.sheets);
  const activeSheet = useSelector((state) => state.drawing.activeSheet);
  const dispatch = useDispatch();

  /**
   * @title 시트 클릭
   * @param {*} sheet
   */
  const handleClickSheet = (sheet) => {
    const { id } = sheet;

    dispatch(drawingActions.selectActiveSheet(id));
  };

  /**
   * @title 새 시트 추가
   * @description redux 상태에 새 시트 추가, Jitsi [ADD_SHEET] 커맨드 전송
   */
  const handleInsertNewSheet = () => {
    const { activeSheet } = initialState;
    const newSheet = {
      ...activeSheet,
      id: v4(),
    };

    dispatch(drawingActions.insertNewSheet(newSheet));

    jitsiManager.sendCommand(ADD_DRAWING_SHEET, {
      value: localUserId,
      attributes: newSheet,
    });
  };

  return (
    <DrawingPresenter
      sheets={sheets}
      activeSheet={activeSheet}
      handleClickSheet={handleClickSheet}
      handleInsertNewSheet={handleInsertNewSheet}
    />
  );
};

export default DrawingContainer;
