import defaultVideo from 'assets/images/defaultVideo.png';
import { useLayoutEffect, useRef } from 'react';

const QuattroVideoLayout = ({ videoTrack, participantElements }) => {
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
    <div className="quattro-video-layout">
      <div className="user-video-box">
        <video
          poster={defaultVideo}
          className="user-video"
          id="video1"
          autoPlay
          ref={videoRef}
        ></video>
        <audio id="audio1" autoPlay></audio>
      </div>
      {participantElements}
    </div>
  );
};

export default QuattroVideoLayout;
