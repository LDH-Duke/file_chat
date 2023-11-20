import { produce } from 'immer';

const initialState = {
  votes: [],
};

const INITIAL_VOTE = 'VOTING/INITIAL_VOTE';
const INSERT_VOTE = 'VOTING/INSERT_VOTE';
const DELETE_VOTE = 'VOTING/DELETE_VOTE';

export const votingActions = {
  /**
   * @title 투표추가
   * @description 투표데이터 추가
   */
  initialVote: (votes) => ({ type: INSERT_VOTE, payload: votes }),
  /**
   * @title 투표추가
   * @description 투표데이터 추가
   */
  insertVote: (newVote) => ({ type: INSERT_VOTE, newVote }),
  /**
   * @title 투표제거
   * @description 투표데이터 제거
   */
  deleteVote: (id) => ({ type: DELETE_VOTE, id }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_VOTE: {
      const { payload } = action;
      return produce(state, (draftState) => {
        draftState.votes = payload;
      });
    }

    case INSERT_VOTE: {
      const { newVote } = action;
      return produce(state, (draftState) => {
        draftState.votes.push(newVote);
      });
    }

    case DELETE_VOTE: {
      const { id } = action;
      return produce(state, (draftState) => {
        draftState.votes.filter((v) => v.id !== id);
      });
    }
    default:
      return state;
  }
};

export default reducer;
