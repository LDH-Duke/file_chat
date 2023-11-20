import React from 'react';
import './Conference.css';
import { Interface, MediaContent } from './components';

const ConferencePresenter = () => {
  return (
    <div className="conference-container">
      <>
        <div className="media-box">
          <div className="video-box">
            <MediaContent />
          </div>
          <div className="interface-box">
            <Interface />
          </div>
        </div>
      </>
    </div>
  );
};

export default ConferencePresenter;
