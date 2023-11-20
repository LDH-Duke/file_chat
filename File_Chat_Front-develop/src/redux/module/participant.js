import { produce } from 'immer';

const JOIN_USER = 'PARTICIPANTS/JOIN_USER';
const LEFT_USER = 'PARTICIPANTS/LEFT_USER';
const MUTE_VIDEO = 'PARTICIPANTS/MUTE_VIDEO';
const MUTE_AUDIO = 'PARTICIPANTS/MUTE_AUDIO';

const SET_REMOTE_TRACK = 'PARTICIPANTS/SET_REMOTE_TRACK';
const REMOVE_PARTICIPANTS_TRACK = 'PARTICIPANTS/REMOVE_PARTICIPANTS_TRACK';

const initialState = {
  list: [],
};

export const participantsAction = {
  joinUser: (payload) => ({
    type: JOIN_USER,
    payload,
  }),
  leftUser: (payload) => ({
    type: LEFT_USER,
    payload,
  }),
  setRemoteTrack: (track) => ({
    type: SET_REMOTE_TRACK,
    track,
  }),
  removeParticipantTrack: (track) => ({
    type: REMOVE_PARTICIPANTS_TRACK,
    track,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_USER:
      return produce(state, (draftState) => {
        const { participant } = action.payload;

        let newUser = {
          id: participant._id,
          name: participant._displayName,
          videoTrack: null,
          audioTrack: null,
          isMuteVideo: false,
          isMuteAudio: false,
        };

        draftState.list.push(newUser);
      });
    case LEFT_USER:
      return produce(state, (draftState) => {
        const { id } = action.payload;

        draftState.list = draftState.list.filter((user) => {
          return user.id !== id;
        });
      });
    case SET_REMOTE_TRACK:
      return produce(state, (draftState) => {
        const { track } = action;
        const userId = track.getParticipantId();
        const user = draftState.list.find((user) => user.id === userId);
        const type = track.getType();

        if (user) {
          if (type === 'video') {
            user.videoTrack = track;
          } else {
            user.audioTrack = track;
          }
        }
      });
    case REMOVE_PARTICIPANTS_TRACK:
      return produce(state, (draftState) => {
        const { track } = action;
        const userId = track.getParticipantId();
        const user = draftState.list.find((user) => user.id === userId);
        const type = track.getType();

        if (user) {
          if (type === 'video') {
            user.videoTrack = null;
          } else {
            user.audioTrack = null;
          }
        }
      });
    case MUTE_VIDEO:
      return produce(state, (draftState) => {});
    case MUTE_AUDIO:
      return produce(state, (draftState) => {});
    default:
      return produce(state, (draftState) => {});
  }
};

export default reducer;
