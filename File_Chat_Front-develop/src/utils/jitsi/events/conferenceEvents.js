const JitsiMeetJS = global.JitsiMeetJS;
const conferenceEvents = JitsiMeetJS.events.conference;

export const TRACK_ADDED = conferenceEvents.TRACK_ADDED;
export const TRACK_REMOVED = conferenceEvents.TRACK_REMOVED;
export const PARTICIPANT_PROPERTY_CHANGED =
  conferenceEvents.PARTICIPANT_PROPERTY_CHANGED;
export const TRACK_MUTE_CHANGED = conferenceEvents.TRACK_MUTE_CHANGED;
export const TRACK_AUDIO_LEVEL_CHANGED =
  conferenceEvents.TRACK_AUDIO_LEVEL_CHANGED;
export const DOMINANT_SPEAKER_CHANGED =
  conferenceEvents.DOMINANT_SPEAKER_CHANGED;
export const USER_JOINED = conferenceEvents.USER_JOINED;
export const USER_LEFT = conferenceEvents.USER_LEFT;
export const MESSAGE_RECEIVED = conferenceEvents.MESSAGE_RECEIVED;
export const DISPLAY_NAME_CHANGED = conferenceEvents.DISPLAY_NAME_CHANGED;
export const SUBJECT_CHANGED = conferenceEvents.SUBJECT_CHANGED;
export const LAST_N_ENDPOINTS_CHANGED =
  conferenceEvents.LAST_N_ENDPOINTS_CHANGED;
export const CONFERENCE_JOINED = conferenceEvents.CONFERENCE_JOINED;
export const DTMF_SUPPORT_CHANGED = conferenceEvents.DTMF_SUPPORT_CHANGED;
export const CONFERENCE_LEFT = conferenceEvents.CONFERENCE_LEFT;
export const USER_STATUS_CHANGED = conferenceEvents.USER_STATUS_CHANGED;
export const USER_ROLE_CHANGED = conferenceEvents.USER_ROLE_CHANGED;
export const CONFERENCE_ERROR = conferenceEvents.CONFERENCE_ERROR;
export const CONFERENCE_FAILED = conferenceEvents.CONFERENCE_FAILED;
export const START_MUTED_POLICY_CHANGED =
  conferenceEvents.START_MUTED_POLICY_CHANGED;
export const KICKED = conferenceEvents.KICKED;
export const BEFORE_STATISTICS_DISPOSED =
  conferenceEvents.BEFORE_STATISTICS_DISPOSED;
export const STARTED_MUTED = conferenceEvents.STARTED_MUTED;
export const AUTH_STATUS_CHANGED = conferenceEvents.AUTH_STATUS_CHANGED;
export const ENDPOINT_MESSAGE_RECEIVED =
  conferenceEvents.ENDPOINT_MESSAGE_RECEIVED;
export const TALK_WHILE_MUTED = conferenceEvents.TALK_WHILE_MUTED;
export const NO_AUDIO_INPUT = conferenceEvents.NO_AUDIO_INPUT;
export const AUDIO_INPUT_STATE_CHANGE =
  conferenceEvents.AUDIO_INPUT_STATE_CHANGE;
export const NOISY_MIC = conferenceEvents.NOISY_MIC;
