import React, { useEffect, useState } from 'react';
import { ParticipantVideo } from './components';
import './MediaContent.css';

import {
  CoupleVideo,
  DocumentSharingVideo,
  DrawingBoard,
  OverVideo,
  QuattroVideo,
  SingleVideo,
  TrioVideo,
} from './layout';

const MediaContentPresenter = ({
  participants,
  videoTrack,
  documentSharingMode,
  isDrawing,
  activeSheet,
}) => {
  /* States */
  const [videoLayout, setVideoLayout] = useState(<></>);

  /* Variables */
  const userCount = participants.length + 1;
  const participantElements = participants.map((user, index) => {
    return <ParticipantVideo user={user} key={index} />;
  });

  const basicProps = {
    videoTrack,
    participantElements,
  };

  /* Hooks */
  useEffect(() => {
    if (documentSharingMode) {
      setVideoLayout(<DocumentSharingVideo {...basicProps} />);
    } else if (isDrawing) {
      setVideoLayout(
        <DrawingBoard {...basicProps} activeSheet={activeSheet} />
      );
    } else {
      switch (userCount) {
        case 1:
          setVideoLayout(<SingleVideo {...basicProps} />);
          break;
        case 2:
          setVideoLayout(<CoupleVideo {...basicProps} />);
          break;
        case 3:
          setVideoLayout(<TrioVideo {...basicProps} />);
          break;
        case 4:
          setVideoLayout(<QuattroVideo {...basicProps} />);
          break;
        default:
          setVideoLayout(<OverVideo {...basicProps} />);
          break;
      }
    }
    //eslint-disable-next-line
  }, [documentSharingMode, participants, isDrawing, videoTrack]);

  /* Render */
  return (
    <div className="media-content-container">
      {/* <DrawingTools /> */}
      {videoLayout}
    </div>
  );
};

export default MediaContentPresenter;
