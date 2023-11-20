import { produce } from 'immer';

export const initialState = {
  sheets: [],
  activeSheet: {
    id: null,
    type: null,
    lines: [],
    actionHistory: [],
  },
  moderateActiveSheetId: null,
};

const SET_SHEETS = 'NEW_DRAWING/SET_SHEETS';
const INSERT_NEW_SHEET = 'NEW_DRAWING/ADD_NEW_SHEET';
const INIT_ACTIVIE_SHEET = 'NEW_DRAWING/INIT_ACTIVIE_SHEET';
const INIT_SHEETS = 'NEW_DRAWING/INIT_SHEETS';
const SELECT_ACTIVE_SHEET = 'NEW_DRAWING/SELECT_ACTIVE_SHEET';
const SELECT_FIRST_SHEET = 'NEW_DRAWING/SELECT_FIRST_SHEET';
const INSERT_NEW_LINE = 'NEW_DRAWING/INSERT_NEW_LINE';
const INSERT_NEW_HISTORY = 'NEW_DRAWING/INSERT_NEW_HISTORY';
const SET_LINES = 'NEW_DRAWING/SET_LINES';
const SET_TARGET_LINE = 'NEW_DRAWING/SET_TARGET_LINE';
const UNDO = 'NEW_DRAWING/UNDO';
const REDO = 'NEW_DRAWING/REDO';

export const drawingActions = {
  /**
   * @title 시트 덮어쓰기
   * @description 방장에게 받은 최초의 시트데이터
   */
  setSheets: (sheets) => ({ type: SET_SHEETS, sheets }),

  /**
   * @title 시트 추가
   * @description 드로잉 탭의 시트 추가 액션
   */
  insertNewSheet: (newSheet) => ({ type: INSERT_NEW_SHEET, newSheet }),

  /**
   * @title 시트 초기화
   * @description 문서 데이터를 기준으로 시트를 생성
   * @ACTION INIT_SHEETS
   */
  initSheets: (sharingDocumentList) => ({
    type: INIT_SHEETS,
    documentList: sharingDocumentList,
  }),

  /**
   * @title activeSheet 초기화
   * @description activeSheet를 선택되지 않은 상태로 되돌린다.
   * @ACTION INIT_ACTIVIE_SHEET
   */
  initActiveSheet: () => ({ type: INIT_ACTIVIE_SHEET }),

  /**
   * @title 시트 선택
   * @description 드로잉 탭의 시트 선택 액션
   */
  selectActiveSheet: (id) => ({ type: SELECT_ACTIVE_SHEET, id }),

  /**
   * @title 초기 시트 선택
   * @description 드로잉 탭이 활성화 되면 맨 처음 시트를 선택하는 액션
   */
  selectFirstDrawingSheet: () => ({ type: SELECT_FIRST_SHEET }),

  /**
   * @title 라인 추가
   * @description 활성시트에 라인을 추가한다.
   */
  insertNewLine: (id, newLine) => ({ type: INSERT_NEW_LINE, id, newLine }),

  /**
   * @title 히스토리 추가
   * @description 활성시트에 이력을 추가한다.
   */
  insertNewHistory: (newHistory) => ({ type: INSERT_NEW_HISTORY, newHistory }),

  /**
   * @title 활성 시트 라인 갱신
   * @description 활성 시트의 라인 객체를 덮어쓴다.
   */
  setLines: (newLines) => ({ type: SET_LINES, newLines }),

  /**
   * @title 활성 시트 특수 라인 갱신
   * @description 활성 시트의 한 라인의 값을 변경한다.
   */
  setTargetLine: (id, newLine) => ({ type: SET_TARGET_LINE, id, newLine }),

  /**
   * @title 액션 되돌리기
   * @description 드로잉 툴의 undo 버튼 클릭시 로컬에서의 마지막 히스토리를 삭제
   */
  undo: () => ({ type: UNDO }),

  /**
   * @title 액션 회귀
   * @description 드로잉 툴의 redo 버튼 클릭시 로컬에서의 undo된 히스토리를 다시 적용
   */
  redo: () => ({ type: REDO }),

  // NOTE 비동기 액션 테스트
  asyncInsertNewLine: (id, newLine) => async (dispatch) => {
    dispatch({ type: INSERT_NEW_LINE, id, newLine });
  },
};

export const drawingThunkActions = {
  selectNowActiveDocumentSheet: () => (dispatch, getState) => {
    const {
      document: { activeImage },
    } = getState();

    if (activeImage) {
      dispatch(drawingActions.selectActiveSheet(activeImage));
    } else {
      dispatch(drawingActions.initActiveSheet());
    }
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHEETS: {
      const { sheets } = action;
      return produce(state, (draftState) => {
        draftState.sheets = sheets;
      });
    }
    case INSERT_NEW_SHEET: {
      const { newSheet } = action;
      return produce(state, (draftState) => {
        draftState.sheets.push(newSheet);
      });
    }
    //SECTION 드로잉 시트 관련 REDUCER
    case INIT_SHEETS: {
      const { documentList } = action;
      const documentKeys = Object.keys(documentList);
      const newSheets = documentKeys.reduce((prev, current) => {
        const currentSheetList = documentList[current].map((url) => {
          const newSheet = {
            id: url,
            lines: [],
            actionHistory: [],
          };
          return newSheet;
        });

        return [...prev, ...currentSheetList];
      }, []);

      return produce(state, (draftState) => {
        draftState.sheets = [...draftState.sheets, ...newSheets];
      });
    }

    case INIT_ACTIVIE_SHEET: {
      return produce(state, (draftState) => {
        draftState.activeSheet = initialState.activeSheet;
      });
    }
    case SELECT_ACTIVE_SHEET: {
      const { id } = action;
      return produce(state, (draftState) => {
        draftState.activeSheet = draftState.sheets.find((s) => s.id === id);

        if (draftState.activeSheet === undefined) {
          const newSheet = {
            id,
            type: 'DOCUMENT',
            lines: [],
            actionHistory: [],
          };

          draftState.sheets.push(newSheet);
          draftState.activeSheet = newSheet;
        }
      });
    }
    case SELECT_FIRST_SHEET: {
      return produce(state, (draftState) => {
        const targetSheet = draftState.sheets.find(
          (sheet) => sheet.type === 'DRAWING'
        );
        if (targetSheet) {
          draftState.activeSheet = targetSheet;
        } else {
          draftState.activeSheet = initialState.activeSheet;
        }
      });
    }
    case INSERT_NEW_LINE: {
      const { id, newLine } = action;

      return produce(state, (draftState) => {
        let target = draftState.sheets.find((s) => s.id === id);
        target.lines.push(newLine);

        if (draftState.activeSheet.id === id) {
          draftState.activeSheet.lines.push(newLine);
        }
      });
    }
    case INSERT_NEW_HISTORY: {
      const { newHistory } = action;
      return produce(state, (draftState) => {
        const { id } = state.activeSheet;
        draftState.activeSheet.actionHistory.push(newHistory);

        const index = draftState.sheets.findIndex((s) => s.id === id);
        draftState.sheets[index] = draftState.activeSheet;
      });
    }
    case SET_LINES: {
      const { newLines } = action;

      return produce(state, (draftState) => {
        const { id } = state.activeSheet;
        draftState.activeSheet.lines = newLines;

        const index = draftState.sheets.findIndex((s) => s.id === id);
        draftState.sheets[index] = draftState.activeSheet;
      });
    }
    case SET_TARGET_LINE: {
      const { id, newLine } = action;
      return produce(state, (draftState) => {
        const { id: activeSheetId } = state.activeSheet;

        const sheetIdx = draftState.sheets.findIndex(
          (s) => s.id === activeSheetId
        );

        const lineIdx = draftState.activeSheet.lines.findIndex(
          (l) => l.id === id
        );

        draftState.activeSheet.lines[lineIdx] = newLine;
        draftState.sheets[sheetIdx] = draftState.activeSheet;
      });
    }
    case UNDO:
      return produce(state, (draftState) => {
        //FIXME LINE 배열을 직접적으로 바꿀건지 HISTORY NUMBER별로 상태를 저장해서 덮어씌울건지 정하자
        draftState.activeSheet.actionHistory.pop();
      });
    case REDO:
      return produce(state, (draftState) => {
        draftState.activeSheet.actionHistory.pop();
      });
    default:
      return state;
  }
};

export default reducer;
