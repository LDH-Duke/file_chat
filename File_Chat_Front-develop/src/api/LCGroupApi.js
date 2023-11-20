import { ApiManager, SUCCESS_CODE } from 'utils';
import LCApiConstant from './LCApiConstant';
const $http = new ApiManager();
// eslint-disable-next-line
export default {
  /**
   * 그룹 생성
   * --
   * @param {*} groupInfo
   * @returns
   */
  insertGroup: async (groupInfo) => {
    try {
      const url = LCApiConstant.INSERT_GROUP;
      const apiResult = await $http.post(url, groupInfo);
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
   * 그룹 목록 조회
   * --
   * @param {*} keyword
   * @returns
   */
  getGroupList: async (keyword = '') => {
    try {
      const url = LCApiConstant.GET_GROUP_LIST.replace(':keyword', keyword);
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
   * 그룹 상세 정보 조회
   * --
   * @param {*} group_id
   * @returns
   */
  getGroupDetail: async (group_id) => {
    try {
      const url = LCApiConstant.GET_GROUP_DETAIL.replace(':group_id', group_id);
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
   * 그룹 멤버 목록 조회
   * --
   * @param {*} group_id
   * @returns
   */
  getGroupMembers: async (group_id) => {
    try {
      const url = LCApiConstant.GET_GROUP_MEMBERS.replace(
        ':group_id',
        group_id
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
   * 그룹 가입
   * --
   * @param {*} groupInfo
   * @returns
   */
  joinGroup: async (groupInfo) => {
    try {
      const url = LCApiConstant.JOIN_GROUP;
      const apiResult = await $http.post(url, groupInfo);
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
   * 나의 그룹 조회
   * --
   * @param {*} user_id
   * @returns
   */
  getMyGroupList: async (user_id) => {
    try {
      const url = LCApiConstant.GET_MY_GROUP_LIST.replace(':user_id', user_id);
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
   * 그룹 정보 수정
   * @param {*} groupInfo
   * @returns
   */
  updateGroup: async (groupInfo) => {
    try {
      const url = LCApiConstant.UPDATE_GROUP;
      const apiResult = await $http.put(url, groupInfo);
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
   * 그룹 삭제
   * @param {*} groupInfo
   * @returns
   */
  deleteGroup: async (groupInfo) => {
    try {
      const url = LCApiConstant.DELETE_GROUP;
      const apiResult = await $http.delete(url, groupInfo);
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
