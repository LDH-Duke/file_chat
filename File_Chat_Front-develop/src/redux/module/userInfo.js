import { produce } from 'immer';

const SET_SESSION = 'USERINFO/SET_SESSION';
const GET_SESSION = 'USERINFO/GET_SESSION';

const initialState = {
  userInfo: undefined,
  token: undefined,
};

export const actions = {
  getSession: () => ({
    type: GET_SESSION,
  }),
  setSession: (payload) => ({ type: SET_SESSION, payload: payload }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      const { payload } = action;
      const { token, userInfo } = payload;
      return produce(state, (draftState) => {
        draftState.userInfo = userInfo;
        draftState.token = token;
      });
    default:
      return state;
  }
};

export default reducer;
