import { conferenceAction } from 'redux/module/conference';
import { localUserActions } from 'redux/module/localUser';
import { participantsAction } from 'redux/module/participant';
// import JitsiManager from '../JitsiManager';

// 새로운 트랙이 추가되었을 때,
export function TRACK_ADDED(track) {
  if (track.isLocal()) return; //로컬 트랙은 participant 트랙에 추가하지 않는다.
  console.log('TRACK_ADDED');

  this._dispatch(participantsAction.setRemoteTrack(track));
}

// 기존에 트랙이 제거되었을 때,
export function TRACK_REMOVED(track) {
  console.log('TRACK_REMOVED');

  this._dispatch(participantsAction.removeParticipantTrack(track));
}

// 참가자 정보가 변경되었을 때
export function PARTICIPANT_PROPERTY_CHANGED(
  participant,
  property,
  oldValue,
  newValue
) {
  console.log('PARTICIPANT_PROPERTY_CHANGED');
}

// 트랙의 소거 여부가 변경되었을 때
export function TRACK_MUTE_CHANGED(track) {
  console.log('TRACK_MUTE_CHANGED');
}

// 트랙의 소거 여부가 변경되었을 때
export function TRACK_AUDIO_LEVEL_CHANGED(id, audioLevel) {}

// 메인화자가 변경되었을 때
export function DOMINANT_SPEAKER_CHANGED(id) {
  console.log('DOMINANT_SPEAKER_CHANGED');
}

// 새로운 참가자가 들어왔을 때
export function USER_JOINED(id, participant) {
  console.log('USER_JOINED');
  this._dispatch(participantsAction.joinUser({ id, participant }));
}

// 유저가 나갔을 때
export function USER_LEFT(id, participant) {
  console.log('USER_LEFT');
  this._dispatch(participantsAction.leftUser({ id, participant }));
}

// 메시지를 받았을 때
export function MESSAGE_RECEIVED(id, msg, timestamp) {
  console.log('MESSAGE_RECEIVED');
}

// 디스플레이 이름이 변경되었을 때
export function DISPLAY_NAME_CHANGED(id, newDisplayName) {
  console.log('DISPLAY_NAME_CHANGED');
}

// 회의 제목이 바꼇을 때
export function SUBJECT_CHANGED(newSubject) {
  console.log('SUBJECT_CHANGED');
}

// 마지막 n 엔드포인트 변경시.. REVIEW 이게뭐죠?
export function LAST_N_ENDPOINTS_CHANGED(endpointIdArray, userEndpointId) {
  console.log('LAST_N_ENDPOINTS_CHANGED');
}

// 회의에 성공적으로 들어왔을 때
export async function CONFERENCE_JOINED() {
  console.log('FLAG 6 : CONFERENCE_JOINED');

  this._dispatch(conferenceAction.setJoined());
}

// 최소 한 명의 사용자가 DTMF를 지원하는지 확인
export function DTMF_SUPPORT_CHANGED(isSupport) {
  console.log('DTMF_SUPPORT_CHANGED');
}

// 로컬 사용자가 회의를 성공적으로 나갔을 때
export function CONFERENCE_LEFT() {
  console.log('CONFERENCE_LEFT');
}

// 일부 사용자 상태가 변경되었을 때
export function USER_STATUS_CHANGED(id, newStatus) {
  console.log('USER_STATUS_CHANGED');
}

// 일부 사용자의 역할이 변경되었을 때
export function USER_ROLE_CHANGED(id, newRole) {
  console.log('USER_ROLE_CHANGED');
  this._dispatch(localUserActions.setUserRole(id, newRole));
}

// 오류가 발생했을 때
export function CONFERENCE_ERROR(code) {
  console.log('CONFERENCE_ERROR');
}

// 로컬사용자가 회의에 참석하지 못했을 때
export function CONFERENCE_FAILED(code) {
  console.log('CONFERENCE_FAILED');
}

// 이후에 참가하는 모든 참가자가 트랙이 음소거된 채로 참여할 것임을 선언
export function START_MUTED_POLICY_CHANGED(config) {
  console.log('START_MUTED_POLICY_CHANGED');
}

// 로컬 사용자가 추방되었을 때
export function KICKED() {
  console.log('KICKED');
}

// 통계 모듈이 폐기되기 직전에 실행되며 연결이 끊어지기 전에 일부 로그를 제출할 마지막 기회
export function BEFORE_STATISTICS_DISPOSED() {
  console.log('BEFORE_STATISTICS_DISPOSED');
}

// 로컬 사용자가 음소거를 시작했을 때
export function STARTED_MUTED() {
  console.log('STARTED_MUTED');
}

// 인증이 활성화 또는 비활성화되었거나, 로컬 사용자가 인증(로그인) 되었을 때
export function AUTH_STATUS_CHANGED() {
  console.log('AUTH_STATUS_CHANGED');
}

// 데이터 채널에서 다른 참가자의 새 메시지가 수신되었을 때
// export function ENDPOINT_MESSAGE_RECEIVED() {
//   console.log('ENDPOINT_MESSAGE_RECEIVED');
// }

// 마이크를 음소거한 상태에서 로컬 사용자가 말하고 있을 때
export function TALK_WHILE_MUTED() {
  console.log('TALK_WHILE_MUTED');
}

// 현재 선택된 입력장치가 신호가 없을 때
export function NO_AUDIO_INPUT() {
  console.log('NO_AUDIO_INPUT');
}

// 현재 회의 오디오 입력 상태가 변경되었을 때
export function AUDIO_INPUT_STATE_CHANGE() {
  console.log('AUDIO_INPUT_STATE_CHANGE');
}

// 현재 오디오 입력 장치에 노이즈가 껴있을 때
export function NOISY_MIC() {
  console.log('NOISY_MIC');
}
