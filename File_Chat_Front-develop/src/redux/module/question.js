import { produce } from 'immer';

const initialState = {
  list: [
    {
      questionId: '11-21',
      questionContent: '집에 언제가세요?',
      questionType: '', // SINGLE | MULTI | TEXT
      answer: {
        options: [
          { option_id: '123', option_content: '1시' },
          { option_id: '434', option_content: '2시' },
          { option_id: '12231', option_content: '3시' },
        ],
        point: 1, // 1~5
        remark: '사아알짞 아쉽다',
      },
    },
    {
      questionId: '11-22',
      questionContent: '머리가 아프구만',
      questionType: '', // SINGLE | MULTI | TEXT
      answer: {
        options: [],
        point: 3, // 1~5
        remark: '좀 마이 아프네예',
      },
    },
  ],
};

const ADD_QUESTION = 'QUESITION/ADD_QUESTION';
const UPDATE_QUESTION = 'QUESITION/UPDATE_QUESTION';
const DELETE_QUESTION = 'QUESITION/DELETE_QUESTION';

const ADD_ANSWER = 'QUESTION/ADD_ANSWER';
const DELETE_ANSWER = 'QUESTION/DELETE_ANSWER';
const UPDATE_ANSWER = 'QUESTION/UPDATE_ANSWER';

const SET_ANSWER = 'QUESTION/SET_ANSWER';

export const questionActions = {
  addQuestion: () => ({ type: ADD_QUESTION }),
  deleteQuestion: (question_id) => ({ type: DELETE_QUESTION, question_id }),
  updateQuestion: (question_id, question_content) => ({
    type: UPDATE_QUESTION,
    question_id,
    question_content,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return produce(state, (draftState) => {
        const newQuestion = {
          questionId: null,
          questionContent: '',
          questionType: '', // SINGLE | MULTI | TEXT
          answer: {
            options: [],
            point: null, // 1~5
            remark: '',
          },
        };

        draftState.list.push(newQuestion);
      });
    case UPDATE_QUESTION:
      return produce(state, (draftState) => {});
    case DELETE_QUESTION:
      return produce(state, (draftState) => {
        const { question_id } = action;

        draftState.filter((q) => question_id !== q.question_id);
      });
    case SET_ANSWER:
      return produce(state, (draftState) => {
        const { question_id, question } = action;
        let targetQuestion = draftState.list.find(
          (q) => q.questionId === question_id
        );
        // eslint-disable-next-line
        targetQuestion = question;
      });
    case ADD_ANSWER:
      return produce(state, (draftState) => {
        const { question_id, answer } = action;

        let targetQuestion = draftState.list.find(
          (q) => q.questionId === question_id
        );

        targetQuestion.answer.options.push(answer);
      });
    case DELETE_ANSWER:
      return produce(state, (draftState) => {});
    case UPDATE_ANSWER:
      return produce(state, (draftState) => {});

    default:
      return state;
  }
};

export default reducer;
