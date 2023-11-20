import produce from 'immer';

export const initialState = {
  tool: null,
  color: '#aaa',
  toggle: false,
  visible: false,
};

const SET_TOOL = 'DRAWING-TOOL/SET_TOOL';
const SET_COLOR = 'DRAWING-TOOL/SET_COLOR';
const SET_TOGGLE = 'DRAWING-TOOL/SET_TOGGLE';
const SET_VISIBLE = 'DRAWING-TOOL/SET_VISIBLE';

export const drawingToolActions = {
  setTool: (tool) => ({ type: SET_TOOL, tool }),
  setColor: (color) => ({ type: SET_COLOR, color }),
  setToggle: (toggle) => ({ type: SET_TOGGLE, toggle }),
  setVisible: (visible) => ({ type: SET_VISIBLE, visible }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOOL: {
      const { tool } = action;
      return produce(state, (draftState) => {
        draftState.tool = tool;
      });
    }
    case SET_COLOR: {
      const { color } = action;

      return produce(state, (draftState) => {
        draftState.color = color;
      });
    }
    case SET_TOGGLE: {
      const { toggle } = action;

      return produce(state, (draftState) => {
        draftState.toggle = toggle;
      });
    }
    case SET_VISIBLE: {
      const { visible } = action;

      return produce(state, (draftState) => {
        draftState.visible = visible;
      });
    }
    default:
      return state;
  }
};

export default reducer;
