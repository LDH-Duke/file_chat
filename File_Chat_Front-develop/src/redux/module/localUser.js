import { produce } from 'immer';

const SET_LOCAL_TRACK = 'LOCAL_USER/SET_LOCAL_TRACK';
const SET_LOCAL_TRACK_MODE = 'LOCAL_USER/SET_LOCAL_TRACK_MODE';
const SET_USER_NAME = 'LOCAL_USER/SET_USER_NAME';
const SET_USER_INFO = 'LOCAL_USER/SET_USER_INFO';
const SET_USER_ROLE = 'LOCAL_USER/SET_USER_ROLE';
const UPDATE_TRACK = 'LOCAL_USER/UPDATE_TRACK';

const initialState = {
  id: null,
  isModerator: false,
  name: null,
  videoTrack: null,
  audioTrack: null,
  desktopTrack: null,
  mode: null, // video or desktop
  me: true,
};

export const localUserActions = {
  setUserName: (username) => ({
    type: SET_USER_NAME,
    name: username,
  }),

  setLocalUserInfo: (info) => ({
    type: SET_USER_INFO,
    info,
  }),

  setLocalTrack: (tracks) => ({
    type: SET_LOCAL_TRACK,
    tracks,
  }),

  setTrackMode: (mode) => ({
    type: SET_LOCAL_TRACK_MODE,
    mode,
  }),
  setUserRole: (id, role) => ({
    type: SET_USER_ROLE,
    id,
    role,
  }),
  updateTrack: (track) => ({ type: UPDATE_TRACK, track }),
};

export function* localUserSaga() {
  // yield takeEvery(SET_LOCAL_TRACK, watchStream);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCAL_TRACK:
      return produce(state, (draftState) => {
        const { tracks } = action;

        tracks.forEach((track) => {
          const type = track.getType();

          if (type === 'video') {
            draftState.videoTrack = track;
          } else {
            draftState.audioTrack = track;
          }
        });
      });
    case SET_LOCAL_TRACK_MODE:
      return produce(state, (draftState) => {
        const { mode } = action;

        draftState.mode = mode;
      });
    case SET_USER_INFO:
      return produce(state, (draftState) => {
        const { id, username, isModerator } = action.info;

        draftState.id = id;
        draftState.name = username;
        draftState.isModerator = isModerator;
      });
    case SET_USER_NAME:
      return produce(state, (draftState) => {
        const { username } = action;

        draftState.name = username;
      });
    case SET_USER_ROLE:
      return produce(state, (draftState) => {
        const { id, role } = action;
        console.log('state.id: ', state.id);
        console.log('id, role: ', id, role);

        if (state.id === id) {
          draftState.isModerator = role === 'moderator' ? true : false;
        }
      });
    case UPDATE_TRACK: {
      const { track } = action;
      return produce(state, (draftState) => {
        draftState.videoTrack = track;
      });
    }
    default:
      return state;
  }
};

export default reducer;
