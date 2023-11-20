// socketio.js

import { io } from 'socket.io-client';
import { BACKEND_URL } from 'utils';

/**
 * [Class] SocketIO
 * --
 */
export default class SocketIO {
  /**
   * 생성자
   * --
   */
  constructor(host = BACKEND_URL, transports = ['websocket']) {
    if (!SocketIO.instance) {
      this.socket = io(host, {
        transports,
      });
      socket.connect();
      // 싱글톤 변수 할당
      SocketIO.instance = this;
    }
    return SocketIO.instance;
  }
}
