import produce from 'immer';
import React, { useEffect, useState } from 'react';
import JitsiManager from 'utils/jitsi/JitsiManager';
import { v4 } from 'uuid';
import VotingPresenter from './VotingPresenter';
import { customCommand } from 'utils/jitsi/events';
import { useDispatch, useSelector } from 'react-redux';
import { votingActions } from 'redux/module/voting';
import { useLocation } from 'react-router';
import { LCConferenceApi } from 'api';

const { BROADCAST_VOTE } = customCommand;
const jitsiManager = new JitsiManager();

const VotingContainer = () => {
  /* Router */
  const { search } = useLocation();
  const [, conference_id] = search.split('?room=');
  /* State */
  const id = useSelector((state) => state.localUser.id);
  const votes = useSelector((state) => state.voting.votes);
  const [subject, setSubject] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  /* Hooks */
  const dispatch = useDispatch();

  useEffect(() => {
    if (conference_id) {
      handleInitalVote();
    }
    // eslint-disable-next-line
  }, [conference_id]);

  /* Functions */
  // 투표 추가이벤트 핸들러
  // FIXME 오경우 팀장님 VOTE INSERT API
  const handleInsertVote = (subject) => {
    const newVote = {
      id: v4(),
      subject,
      options,
    };

    dispatch(votingActions.insertVote(newVote));
    setOptions([]);
  };

  // 투표 제거 이벤트 핸들러
  // FIXME 오경우 팀장님 VOTE DELETE API
  const handleRemoveVote = (id) => {
    dispatch(votingActions.deleteVote(id));
  };

  // 옵션 추가 이벤트 핸들러
  const handleInsertOption = () => {
    let newOptions = produce(options, (draftOptions) => {
      draftOptions.push({
        id: v4(),
        value: '새 옵션',
      });
    });

    setOptions(newOptions);
  };

  // 옵션 제거 이벤트 핸들러
  const handleRemoveOption = () => {
    let newOptions = produce(options, (draftOptions) => {
      return draftOptions.filter((o) => o.id !== selectedOption);
    });

    setOptions(newOptions);
  };

  // 옵션 텍스트 변경 이벤트 핸들러
  const setOptionText = (id, value) => {
    let newOptions = produce(options, (draftOptions) => {
      let targetOption = draftOptions.find((o) => o.id === id);
      targetOption.value = value;
    });

    setOptions(newOptions);
  };

  /**
   * @title 투표 전송
   * @description jitsi [BROADCAST_VOTE] 커맨드 전송
   * @param {*} v
   */
  const sendBroadcastVoteCommand = (v) => {
    const data = { ...v, options: JSON.stringify(v.options) };

    jitsiManager.sendCommand(BROADCAST_VOTE, {
      value: id,
      attributes: data,
    });

    console.log('send signal');
  };

  /**
   * 설문/투표 데이터 초기화(데이터 조회)
   * --
   */
  const handleInitalVote = async () => {
    const result = await LCConferenceApi.getConferenceDetail(conference_id);
    if (result) {
      const { survey } = result;
      console.log(survey);
    }
  };

  /* Render */
  return (
    <VotingPresenter
      votes={votes}
      subject={subject}
      setSubject={setSubject}
      options={options}
      setOptionText={setOptionText}
      handleInsertOption={handleInsertOption}
      handleRemoveOption={handleRemoveOption}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      handleInsertVote={handleInsertVote}
      handleRemoveVote={handleRemoveVote}
      sendBroadcastVoteCommand={sendBroadcastVoteCommand}
    />
  );
};

export default VotingContainer;
