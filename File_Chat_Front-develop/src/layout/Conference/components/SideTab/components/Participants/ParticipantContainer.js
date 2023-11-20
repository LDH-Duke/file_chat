import React from 'react';
import { useSelector } from 'react-redux';
import ParticipantPresenter from './ParticipantPresenter';

const ParticipantContainer = () => {
  const list = useSelector((state) => state.participant.list);
  const localUser = useSelector((state) => state.localUser);
  return <ParticipantPresenter list={list} localUser={localUser} />;
};

export default ParticipantContainer;
