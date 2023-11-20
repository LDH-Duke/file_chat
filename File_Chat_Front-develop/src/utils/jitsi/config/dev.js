/**
 * 화상대화 dev config
 */
// const VIDEO_BRIDEGE_SERVER_URL = 'u-server.jsim.kr';
const NCP_SERVER_URL = 'broadcast.livecon.kr';

let nowUrl = NCP_SERVER_URL;

const config = {
  hosts: {
    domain: `${nowUrl}`,
    muc: `conference.${nowUrl}`, // FIXME: use XEP-0030
  },
  bosh: `https://${nowUrl}/http-bind`, // FIXME: use xep-0156 for that

  openBridgeChannel: 'datachannel',
  resolution: 720,
  channelLastN: -1,
  constraints: {
    video: {
      aspectRatio: 1.3,
      height: { ideal: 720, min: 240, max: 720 },
      width: { min: 640, max: 1280 },
    },
  },
  disableSuspendVideo: true,
  minHDHeight: 240,
  p2p: {
    enabled: false,
  },
  stereo: true,
  e2eping: { pingInterval: 10000, analyticsInterval: 60000 },
  disableSimulcast: true,
};

export default config;
