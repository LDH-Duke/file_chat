import React from 'react';

const Participant = ({ user }) => {
  // eslint-disable-next-line
  const { id, name, isMuteVideo, isMuteAudio, me } = user;
  let thumbnailCharacter = name ? name[0] : '';

  return (
    <div className="user-info">
      <div className="thumb-box">
        <span className="text">{thumbnailCharacter}</span>
      </div>
      <div className="info-box">
        <div className="name">
          {name}
          {me ? <span>(나)</span> : <></>}
        </div>

        <div className="sub">Lorem ipsum, dolor sit amet.</div>
      </div>
    </div>
  );
};

export default Participant;
