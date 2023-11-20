import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SettingPresenter from './SettingPresenter';
import { v4 } from 'uuid';

const SettingContainer = () => {
  /* Router */
  const history = useHistory();

  /* States */
  const [streamingCategory, setstreamingCategory] = useState('BASIC');

  /* Variables */
  const roomName = v4();

  /* Functions */
  const handlerJoinConference = async () => {
    //NOTE 마지막에 라우팅
    history.push(`/broadcast?room=${roomName}`);
  };

  /* Render */
  return (
    <SettingPresenter
      streamingCategory={streamingCategory}
      setstreamingCategory={setstreamingCategory}
      handlerJoinConference={handlerJoinConference}
    />
  );
};

export default SettingContainer;
