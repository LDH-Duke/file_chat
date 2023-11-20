import defaultVideo from 'assets/images/defaultVideo.png';
import { useLayoutEffect, useRef } from 'react';

const SingleVideoLayout = ({ videoTrack }) => {
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
    <div className="single-video-layout">
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
  );
};

export default SingleVideoLayout;
