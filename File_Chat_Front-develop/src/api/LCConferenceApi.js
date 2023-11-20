import { ApiManager, SUCCESS_CODE } from 'utils';
import LCApiConstant from './LCApiConstant';
const $http = new ApiManager();
// eslint-disable-next-line
export default {
  //SECTION conference
  /**
   * 컨퍼런스 등록
   * --
   * @param {*} conferenceinfo
   * @returns
   */
  insertConference: async (conferenceinfo) => {
    try {
      const url = LCApiConstant.INSERT_CONFERENCE;
      const apiResult = await $http.post(url, conferenceinfo);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  /**
   * 컨퍼런스 목록 조회
   * --
   */
  getConference: async () => {
    try {
      const url = LCApiConstant.GET_CONFERENCE_LIST;
      const apiResult = await $http.get(url);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  /**
   * 컨퍼런스 상세 조회
   * --
   * @param {*} conference_id
   */
  getConferenceDetail: async (conference_id) => {
    try {
      const url = LCApiConstant.GET_CONFERENCE_DETAIL.replace(
        ':conference_id',
        conference_id
      );
      const apiResult = await $http.get(url);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  /**
   * 컨퍼런스 참여
   * --
   * @param {*} participantInfo
   */
  participantConference: async (participantInfo) => {
    try {
      const url = LCApiConstant.PARTICIPANT_CONFERENCE;
      const apiResult = await $http.post(url, participantInfo);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  /**
   * 컨퍼런스 수정
   * --
   * @param {*} conference_id
   */
  updateConference: async (conferenceInfo) => {
    try {
      const url = LCApiConstant.UPDATE_CONFERENCE;
      const apiResult = await $http.put(url, conferenceInfo);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },

  /**
   * 컨퍼런스 상태 수정
   * @param {*} conferenceInfo
   * @returns
   */
  updateConferenceState: async (conferenceInfo) => {
    try {
      const url = LCApiConstant.UPDATE_CONFERENCE_STATE;
      const apiResult = await $http.put(url, conferenceInfo);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },

  /**
   * 컨퍼런스 삭제
   * --
   * @param {conference_id} conferenceInfo
   */
  deleteConference: async (conferenceInfo) => {
    try {
      const url = LCApiConstant.DELETE_CONFERENCE;
      const apiResult = await $http.delete(url, conferenceInfo);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },

  //SECTION conference_assets

  /**
   * 컨퍼런스 에셋 추가
   * --
   * @param {conference_asset} conferenceAsset
   */
  insertConferenceAsset: async (conferenceAsset) => {
    try {
      const url = LCApiConstant.INSERT_CONFERENCE_ASSET;
      const apiResult = await $http.post(url, conferenceAsset);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  /**
   * 컨퍼런스 에셋 수정
   * --
   * @param {conference_asset} conferenceAsset
   */
  updateConferenceAsset: async (conferenceAsset) => {
    try {
      const url = LCApiConstant.UPDATE_CONFERENCE_ASSET;
      const apiResult = await $http.put(url, conferenceAsset);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  /**
   * 컨퍼런스 에셋 삭제
   * --
   * @param {conference_asset} conferenceAsset
   */
  deleteConferenceAsset: async (conferenceAsset) => {
    try {
      const url = LCApiConstant.DELETE_CONFERENCE_ASSET;
      const apiResult = await $http.delete(url, conferenceAsset);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },

  //SECTION conference_survey

  /**
   * 컨퍼런스 설문 추가
   * --
   * @param {conference_survey} surveyInfo
   */
  insertConferenceSurvey: async (surveyInfo) => {
    try {
      const url = LCApiConstant.INSERT_CONFERENCE_SURVEY;
      const apiResult = await $http.post(url, surveyInfo);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  /**
   * 컨퍼런스 설문 수정
   * --
   * @param {conference_survey} surveyInfo
   */
  updateConferenceSurvey: async (surveyInfo) => {
    try {
      const url = LCApiConstant.UPDATE_CONFERENCE_SURVEY;
      const apiResult = await $http.put(url, surveyInfo);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
  /**
   * 컨퍼런스 설문 삭제
   * --
   * @param {conference_survey} surveyInfo
   */
  deleteConferenceSurvey: async (surveyInfo) => {
    try {
      const url = LCApiConstant.DELETE_CONFERENCE_SURVEY;
      const apiResult = await $http.delete(url, surveyInfo);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },

  //SECTION conference_conclusion

  /**
   * 컨퍼런스 종료 자료 조회
   * @param {*} conference_id
   * @returns
   */
  getConclusion: async (conference_id) => {
    try {
      const url = LCApiConstant.GET_CONFERENCE_CONCLUSION.replace(
        ':conference_id',
        conference_id
      );
      const apiResult = await $http.get(url);
      const { status, message, data } = apiResult;
      if (status === SUCCESS_CODE) {
        return data;
      }

      throw message;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
};
