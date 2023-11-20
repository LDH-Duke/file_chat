import { ApiManager, SUCCESS_CODE } from 'utils';
import LCApiConstant from './LCApiConstant';
const $http = new ApiManager();
// eslint-disable-next-line
export default {
  signinUser: async (userInfo) => {
    try {
      const url = LCApiConstant.SIGNIN_USER;
      const apiResult = await $http.post(url, userInfo);
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
  signupUser: async (userInfo) => {
    try {
      const url = LCApiConstant.INSERT_USER;
      const apiResult = await $http.post(url, userInfo);
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
  getUserList: async (keyword = '') => {
    try {
      const url = LCApiConstant.GET_USER_LIST.replace(':keyword', keyword);
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
