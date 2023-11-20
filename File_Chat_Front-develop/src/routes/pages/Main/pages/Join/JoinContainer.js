import React from 'react';
import { useHistory } from 'react-router-dom';
import JoinPresenter from './JoinPresenter';

const JoinContainer = () => {
  const history = useHistory();
  const handleCreateRoom = () => {
    history.push('/m/set');
  };

  const handleJoinRoom = () => {
    history.push('/');
  };
  return (
    <JoinPresenter
      handleCreateRoom={handleCreateRoom}
      handleJoinRoom={handleJoinRoom}
    />
  );
};

export default JoinContainer;
