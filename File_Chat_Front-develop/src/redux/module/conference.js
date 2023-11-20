import { produce } from 'immer';

const CONNECT_SUCCESS = 'CONFERENCE_CONNECT_SUCCESS';
const CONNECT_FAILED = 'CONFERENCE_CONNECT_FAILED';
const JOIN_SUCCESS = 'CONFERENCE_JOIN_SUCCESS';
const JOIN_FAILED = 'CONFERENCE_JOIN_FAILED';

const ADD_TRACK_TO_ROOM = 'CONFERENCE/ADD_TRACK_TO_ROOM';

const SET_INVITE = 'CONFERENCE/SET_INVITE';
const SET_DRAWING = 'CONFERENCE/SET_DRAWING';

const SET_ACTIVE_MENU = 'CONFERENCE/SET_ACTIVE_MENU';

const initialState = {
  isConnected: false,
  isJoined: false,
  isInvited: true,
  isDrawing: false,
  isAddedLocalTrack: false,
  activeMenu: null,
};

export const conferenceAction = {
  /**
   * @title 회의실 객체 연결 성공
   * @description 회의실 객체 연결 성공을 전달하는 액션
   */
  setConnectionSuccess: () => ({ type: CONNECT_SUCCESS }),

  /**
   * @title 회의실 객체 연결 실패
   * @description 회의실 객체 연결 실패를 전달하는 액션
   */
  setConnectionFailed: () => ({ type: CONNECT_FAILED }),
  /**
   * @title 회의실 접속 성공
   * @description 회의실 접속 성공을 전달하는 액션
   */
  setJoined: () => ({ type: JOIN_SUCCESS }),

  /**
   * @title 회의실 접속 성공
   * @description 회의실 접속 실패를 전달하는 액션
   */
  setJoineFailed: () => ({ type: JOIN_FAILED }),

  /**
   * @title 드로잉 기능 활성화 여부
   * @param {boolean} flag 메뉴 활성화 여부
   * @returns
   */
  setDrawing: (flag) => ({ type: SET_DRAWING, flag }),

  /**
   * @title 방에 트랙 추가
   */
  setAddTrackToRoom: () => ({
    type: ADD_TRACK_TO_ROOM,
  }),

  setInvite: (inviteState) => ({
    type: SET_INVITE,
    inviteState,
  }),

  setActiveMenu: (menu) => ({
    type: SET_ACTIVE_MENU,
    menu,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_SUCCESS:
      return Object.assign({}, state, { isConnected: true });
    case CONNECT_FAILED:
      return Object.assign({}, state, { isConnected: false });
    case JOIN_SUCCESS:
      return Object.assign({}, state, { isJoined: true });
    case JOIN_FAILED:
      return Object.assign({}, state, { isJoined: false });
    case ADD_TRACK_TO_ROOM:
      return produce(state, (draftState) => {
        draftState.isAddedLocalTrack = true;
      });
    case SET_INVITE:
      const { inviteState } = action;
      return produce(state, (draftState) => {
        draftState.isInvited = inviteState;
      });
    case SET_DRAWING: {
      const { flag } = action;
      return produce(state, (draftState) => {
        draftState.isDrawing = flag;
      });
    }
    case SET_ACTIVE_MENU: {
      const { menu } = action;

      return produce(state, (draftState) => {
        draftState.activeMenu = menu;
      });
    }

    default:
      return state;
  }
};

export default reducer;
