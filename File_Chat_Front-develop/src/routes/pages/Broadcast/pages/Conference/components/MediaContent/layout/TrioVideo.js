import defaultVideo from 'assets/images/defaultVideo.png';
import { useLayoutEffect, useRef } from 'react';

const TrioVideoLayout = ({ videoTrack, participantElements }) => {
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
    }
    return () => {
      if (videoTrack) {
        //eslint-disable-next-line
        videoTrack.detach(videoRef.current);
      }
    };
    //eslint-disable-next-line
  }, [videoTrack]);

  return (
    <div className="trio-video-layout">
      <div className="left-side">
        <div className="user-video-box">
          <video
            poster={defaultVideo}
            className="user-video"
            id="video1"
            ref={videoRef}
            autoPlay
          ></video>
          <audio id="audio1" autoPlay></audio>
        </div>
      </div>
      <div className="right-side">{participantElements}</div>
    </div>
  );
};

export default TrioVideoLayout;
