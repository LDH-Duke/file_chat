import defaultVideo from 'assets/images/defaultVideo.png';
import { useLayoutEffect, useRef } from 'react';

const CoupleVideoLayout = ({ videoTrack, participantElements }) => {
  //eslint-disable-next-line
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
    <div className="couple-video-layout">
      <div className="user-video-box">
        <video
          poster={defaultVideo}
          className="user-video"
          id="video1"
          autoPlay
          ref={videoRef}
        ></video>
      </div>
      {participantElements}
    </div>
  );
};

export default CoupleVideoLayout;
