// import ApiConstant from './ApiConstant';
import ApiManager from 'utils/ApiManager';
import { parameterToPath } from 'utils';
const $http = new ApiManager();

const API = {
  /**
   * 채팅방 생성
   * --
   */
  createRoom: (body) => $http.post(`/rooms`, body),
  /**
   * 채팅방 수정
   * --
   */
  updateRoom: (roomId, body) =>
    $http.put(parameterToPath(`/rooms/:roomId`, { roomId }), body),

  /**
   * 채팅방 상세조회
   * --
   */
  getRoom: (roomId) => $http.get(parameterToPath(`/rooms/:roomId`, { roomId })),

  /**
   * 채팅방 상세조회
   * --
   */
  getChats: (roomId) => $http.get(parameterToPath(`/chat/:roomId`, { roomId })),

  /**
   * 채팅방 상세조회
   * --
   */
  getUsers: () => $http.get('/users'),

  /**
   * 채팅방 상세조회
   * --
   */
  getInvites: (userId) => $http.get('/invite', { userId }),

  /**
   * 파일 목록조회
   * --
   */
  getFiles: (roomId) =>
    $http.get(parameterToPath(`/files/:roomId`, { roomId })),

  /**
   * 회원가입
   * --
   */
  inviteAccess: (inviteId, body) =>
    $http.put(parameterToPath(`/invite/:inviteId/update`, { inviteId }), body),

  /**
   * 회원가입
   * --
   */
  join: (body) => $http.post(`/users`, body),

  /**
   * 로그인
   * --
   */
  login: (body) => $http.post(`/users/login`, body),

  /**
   * 파일다운로드
   * --
   */
  fileDownload: (body) => $http.get(`/download/:fileId`, body),

  /**
   * 인증코드 발급
   * --
   */
  authCodeSearch: (room_id) => $http.get(`/auth-code`, { room_id }),

  /**
   * 버그 리포트
   * --
   */
  sendBugReport: (body) => $http.post(`/bug/report`, body),

  /**
   * 채팅방 나가기
   * --
   */
  leaveRoom: (roomId) => $http.delete(parameterToPath(`/rooms/:roomId`, { roomId })),

  /**
   * 다운로드 요청
   * --
   */
  download: (body) => $http.post(`/download/file`, { body }),

  /**ㄹ
   * 친구 초대
   * --
   */
  inviteUser: (body) => $http.post(`/invite`, body),

};
export default API;
