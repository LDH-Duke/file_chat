import { localUserActions } from 'redux/module/localUser';
import connectConfig from './config';
import { conferenceEvents, connectionEvents } from './events';
import { conferenceHandler, connectionHandler } from './handler';
import MessageAlert from 'utils/MessageAlert';

const JitsiMeetJS = global.JitsiMeetJS;
const jitsiInitOption = {
  disableAudioLevels: false,
  disableSimulcast: true,
  resolution: 720,
};
/**
 * @title Jitsi 라이브러리 컨트롤러
 * @description (싱글턴)Jitsi에 관련된 처리를 담당하는 메인 컨트롤러
 */
class JitsiManager {
  constructor() {
    this._connection = null;
    this._conference = null;
    this._localTracks = [];

    if (!JitsiManager.instance) {
      JitsiManager.instance = this;
    }

    return JitsiManager.instance;
  }
  /**
   * @title jitsi API를 초기화 하는 것
   * @description jitsi API를 사용하기 위해서 초기화
   * @param dispatch 컨트롤러 내에서 hook을 사용하기 위해 전달한 dispatch 객체
   * @param history 컨트롤러 내에서 hook을 사용하기 위해 전달한 history 객체
   * @param handler 컴포넌트에서 바인딩할 이벤트 리스터 목록
   */
  init = (dispatch, history, handlers = []) => {
    console.log('FLAG 1 : Jitsi Init');
    JitsiMeetJS.init(jitsiInitOption);
    JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);

    const connection = new JitsiMeetJS.JitsiConnection(
      null,
      null,
      connectConfig
    );

    connection._dispatch = dispatch;
    connection._history = history;

    this._bindHandler(connection, connectionEvents, connectionHandler);
    this._bindHandlerFromComponent(handlers, connection);

    connection.connect(); //연결
    this._connection = connection;

    console.log('FLAG 2 : Try Connection');
    return connection;
  };

  /**
   * @title jitsi conference 객체 생성
   * @description jitsi conference 객체를 생성하고 conferecen 이벤트들을 바인딩한다.
   * @param {*} dispatch redux dispatch 객체
   * @param {*} history history Hook 객체
   * @param {*} roomName 방제
   * @param {*} handlers 바인딩할 이벤트 리스트
   * @returns
   */
  initConference = (dispatch, history, roomName, handlers = []) => {
    console.log('FLAG 4 : Init Conference');
    const conference = this._connection.initJitsiConference(roomName, {
      openBridgeChannel: true,
      ignoreStartMuted: true,
      startVideoMuted: false,
      startAudioMuted: false,
    });

    conference._dispatch = dispatch;
    conference._history = history;

    this._bindHandler(conference, conferenceEvents, conferenceHandler);
    this._bindHandlerFromComponent(handlers, conference);

    this._conference = conference;
    return conference;
  };

  join = (displayName) => {
    console.log('FLAG 5 : Try Join');
    this._setDisplayName(displayName);
    this._conference.join();
  };

  leave = () => {
    this.removeHandler(this._conference);
    this.removeHandler(this._connection);
    this._conference.leave();
    this._conference = null;
    this.removeLocalTrack();
  };

  // newJoin = async (displayName, dispatch, history, roomName) => {
  //   if (this._conference === null) {
  //     const conn = this.initConference(dispatch, history, roomName);
  //   }
  //   this.join(displayName);
  // };

  newAddTrack = async (dispatch) => {
    let localTrack;
    try {
      localTrack = await this.getLocalTrack();
    } catch (error) {
      try {
        localTrack = await this.getScreenTrack();
      } catch (error) {}
    } finally {
      if (localTrack) {
        dispatch(localUserActions.setLocalTrack(localTrack));
        await this.addTrackToConferencePromise(localTrack);
        this._localTracks = localTrack;
        console.log('FLAG 7 : Add Track To Conference');
      }
    }
  };

  /**
   * @title 로컬 트랙을 받아오는 함수
   * @description 로컬의 트랙을 받아와서 성공시 resolve 콜백함수 실행, 실패시 reject 콜백함수 실행
   */
  async getLocalTrack(devices = ['video', 'audio']) {
    // STEP 1 로컬 트랙 요청
    const tracks = await JitsiMeetJS.createLocalTracks(
      {
        devices,
      },
      true
    );

    // STEP 2 객체 할당
    console.log('FLAG 5.5 : Get Local Track');
    return tracks;
  }

  async getScreenTrack() {
    const devices = ['desktop'];
    const tracks = await JitsiMeetJS.createLocalTracks({
      devices,
    });

    console.log('FLAG 5.6 : Get Desktop Local Track');
    return tracks;
  }

  removeLocalTrack() {
    this._localTracks = null;
  }

  /**
   * @title 회의에 트랙 추가
   * @description 회의에 트랙을 추가하여 성공, 실패 콜백함수를 실행
   * @param resolve 트랙 추가 성공시 실행하는 콜백함수
   * @param reject 트랙 추가 실패시 실행하는 콜백함수
   */
  addTrackToConferencePromise(tracks) {
    this._localTracks.forEach((track) => track.dispose());
    return Promise.all(
      tracks.map((track) => {
        return this._conference.addTrack(track);
      })
    );
  }

  replaceTrackToConferencePromise(tracks) {
    return Promise.all(
      tracks.map((track) => {
        return this._conference.replaceTrack(null, track);
      })
    );
  }

  disposeTrackFromConference(track) {
    return new Promise((resolve, reject) => {
      track
        .dispose()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  sendMessage(msg) {
    this._conference.sendTextMessage(msg);
  }

  sharingImage(url) {
    // this._conference;
  }

  _setDisplayName(displayName) {
    this._conference.setDisplayName(displayName);
  }

  /**
   * @title Connection 핸들러 바인딩
   * @description JitsiManager 내부에서 처리할 핸들러를 바인딩
   * @param handlers 컴포넌트에서 전달한 핸들러
   * @param connection JitsiConnection 객체
   * @param dispatch 컴포넌트에서 전달한 dispatch 객체
   */
  _bindHandler(jitsiObject, events = {}, handler = {}) {
    for (const key in handler) {
      if (handler.hasOwnProperty(key)) {
        const _event = events[key];
        const _handler = handler[key];
        const { _dispatch, _history } = jitsiObject;

        jitsiObject.addEventListener(
          _event,
          _handler.bind({ _dispatch, _history })
        );
      }
    }
  }

  removeHandler(jitsiObject, events = {}, handler = {}) {
    for (const key in handler) {
      if (handler.hasOwnProperty(key)) {
        const _event = events[key];
        const _handler = handler[key];
        const { _dispatch, _history } = jitsiObject;

        jitsiObject.removeEventListener(
          _event,
          _handler.bind({ _dispatch, _history })
        );
      }
    }
  }

  /**
   * @title 컴포넌트에서 전달한 JitsiObject 핸들러 바인딩
   * @description 컴포넌트에서 처리해야하는 핸들러들을 바인딩한다.
   * @param handlers 컴포넌트에서 전달한 핸들러
   * @param JitsiObject Jitsi 객체
   */
  _bindHandlerFromComponent(handlers = [], JitsiObject) {
    handlers.forEach((handler) => {
      JitsiObject.addEventListener(handler.event, handler.handler);
    });
  }

  disconnect() {
    this._connection.disconnect();
    this._conference = null;
    this._connection = null;
  }

  //FIXME 검증 필요
  getParticipantsInfo() {
    if (this._conference) {
      return this._conference.getParticpants();
    } else {
      throw new Error('NO CONFERENCE');
    }
  }

  //FIXME 검증 필요
  getParticpantCount() {
    if (this._conference) {
      return this._conference.getParticipantCount();
    } else {
      throw new Error('NO CONFERENCE');
    }
  }
  //FIXME 검증 필요
  /**
   * @title 다른 참가자 음소거 기능
   * @param id 음소거할 참가자 아이디
   */
  muteOtherParticipants(id) {
    if (this._conference) {
      return this._conference.muteParticipant(id);
    } else {
      throw new Error('NO CONFERENCE');
    }
  }

  /**
   * @title jitsi 커맨드 리스너 바인딩
   * @param {*} command 커맨드
   * @param {*} callback 콜백함수
   */
  bindCommandListener(command, callback) {
    this._conference.addCommandListener(command, callback);
  }

  /**
   * @title jitsi 커맨드 리스너 바인딩 해제
   * @param {*} command 커맨드
   * @param {*} callback 콜백함수
   */
  removeCommandListener(command, callback) {
    this._conference.removeCommandListener(command, callback);
  }

  /**
   * @title 커맨드 전송
   * @param {*} command
   * @param {*} data
   * @returns
   */
  sendCommand = (command, data) => {
    if (!this._conference) {
      MessageAlert.error('Jitsi Coference is Null');
      return;
    }

    this._conference.sendCommandOnce(command, data);
  };
}

export default JitsiManager;
