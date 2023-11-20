import React, { useEffect, useState } from 'react';
import { Participant } from './components';
const ParticipantPresenter = ({ list, localUser }) => {
  const [participantElements, setParticipantElements] = useState([]);

  useEffect(() => {
    setParticipantElements([
      <Participant user={localUser} />,
      //FIXME list props로 대체
      list.map((p, i) => {
        return <Participant user={p} key={i} />;
      }),
    ]);

    return () => {
      setParticipantElements([]);
    };
  }, [list, localUser]);

  return (
    <div className="participants-container">
      <div className="participants-flex-box">
        <div className="user-list-box">{participantElements}</div>
      </div>
    </div>
  );
};

export default ParticipantPresenter;
