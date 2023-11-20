import React, { useEffect, useRef } from 'react';
import defaultVideo from 'assets/images/defaultVideo.png';
import { WifiOutlined } from '@ant-design/icons';

const ParticipantVideo = ({ user }) => {
  const { id, name, videoTrack, audioTrack } = user;

  const videoRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    if (!user) return;

    if (videoTrack) {
      videoTrack.attach(videoRef.current);
    }

    if (audioTrack) {
      audioTrack.attach(audioRef.current);
    }

    return () => {
      if (videoTrack) {
        // eslint-disable-next-line
        videoTrack.detach(videoRef.current);
      }

      if (audioTrack) {
        // eslint-disable-next-line
        audioTrack.detach(audioRef.current);
      }
    };
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="participants-video-box" id={`${id}-media-box`}>
      <div className="video-wrapper">
        <div className="label-area">
          <div className="display-name-text">
            <WifiOutlined /> {name}
          </div>
        </div>
        <video
          className="user-video"
          id={`${id}-video`}
          autoPlay
          ref={videoRef}
          poster={defaultVideo}
        ></video>
      </div>
      <audio
        className="user-audio"
        id={`${id}-audio`}
        autoPlay
        ref={audioRef}
      ></audio>
    </div>
  );
};

export default ParticipantVideo;
