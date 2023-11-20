import { HOST_URL } from 'utils';
// eslint-disable-next-line
export default {
  // Dashboard
  GET_USER_DASHBOARD: `${HOST_URL}/dashboard/:user_id`,

  // Users
  INSERT_USER: `${HOST_URL}/users`,
  SIGNIN_USER: `${HOST_URL}/login/users`,
  GET_USER_LIST: `${HOST_URL}/users?keyword=:keyword`,

  // Groups
  INSERT_GROUP: `${HOST_URL}/groups`,
  GET_GROUP_LIST: `${HOST_URL}/groups?keyword=:keyword`,
  GET_GROUP_DETAIL: `${HOST_URL}/groups/:group_id`,
  GET_GROUP_MEMBERS: `${HOST_URL}/groups/members/:group_id`,
  GET_MY_GROUP_LIST: `${HOST_URL}/groups/mygroup/:user_id`,
  JOIN_GROUP: `${HOST_URL}/groups/join`,
  UPDATE_GROUP: `${HOST_URL}/groups`,
  DELETE_GROUP: `${HOST_URL}/groups`,

  //Conference
  INSERT_CONFERENCE: `${HOST_URL}/conference`,
  GET_CONFERENCE_LIST: `${HOST_URL}/conference`,
  GET_CONFERENCE_DETAIL: `${HOST_URL}/conference/detail/:conference_id`,
  UPDATE_CONFERENCE: `${HOST_URL}/conference`,
  UPDATE_CONFERENCE_STATE: `${HOST_URL}/conference/state`,
  DELETE_CONFERENCE: `${HOST_URL}/conference`,
  PARTICIPANT_CONFERENCE: `${HOST_URL}/conference/participant`,
  GET_CONFERENCE_CONCLUSION: `${HOST_URL}/conference/result/:conference_id`,

  //Conference Asset
  INSERT_CONFERENCE_ASSET: `${HOST_URL}/conference/assets`,
  UPDATE_CONFERENCE_ASSET: `${HOST_URL}/conference/assets`,
  DELETE_CONFERENCE_ASSET: `${HOST_URL}/conference/assets`,

  //Conference Survey
  INSERT_CONFERENCE_SURVEY: `${HOST_URL}/conference/survey`,
  UPDATE_CONFERENCE_SURVEY: `${HOST_URL}/conference/survey`,
  DELETE_CONFERENCE_SURVEY: `${HOST_URL}/conference/survey`,
  INSERT_CONFERENCE_SURVEY_ANSWER: `${HOST_URL}/conference/survey/answer`,
  UPDATE_CONFERENCE_SURVEY_ANSWER: `${HOST_URL}/conference/survey/answer`,
  DELETE_CONFERENCE_SURVEY_ANSWER: `${HOST_URL}/conference/survey/answer`,

  //Explorer
  GET_EXPLORER: `${HOST_URL}/explorer`,
  SEARCH_EXPLORER: `${HOST_URL}/explorer/search`,
};
