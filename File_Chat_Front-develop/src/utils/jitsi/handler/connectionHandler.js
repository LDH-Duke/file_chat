import { conferenceAction } from 'redux/module/conference';

/**
 * REVIEW
 * 핸들러에 dispatch를 바인딩해서 보내기 때문에
 * this(return action) 하면 dispatch 가능
 */

//서버 연결 실패
export function CONNECTION_FAILED() {
  console.log('CONNECTION_FAILED');

  this._dispatch(conferenceAction.setConnectionFailed());
}

//서버 연결 성공
export function CONNECTION_ESTABLISHED(e) {
  console.log('CONNECTION_ESTABLISHED');
  console.log('FLAG 3 : Success Connection');

  this._dispatch(conferenceAction.setConnectionSuccess());
}

//연결이 끊겼음을 나타냅니다.
export function CONNECTION_DISCONNECTED() {
  console.log('CONNECTION_DISCONNECTED');

  this._dispatch(conferenceAction.setConnectionFailed());
}

//연결 상태가 잘못된 상태에서 실행할 수 없는 작업을 사용자가 수행한 경우
export function WRONG_STATE() {
  console.log('WRONG_STATE');
}
