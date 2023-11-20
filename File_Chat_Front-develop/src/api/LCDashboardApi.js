import { ApiManager, SUCCESS_CODE } from 'utils';
import LCApiConstant from './LCApiConstant';
const $http = new ApiManager();
// eslint-disable-next-line
export default {
  getUserDashboard: async (user_id) => {
    try {
      const url = LCApiConstant.GET_USER_DASHBOARD.replace(':user_id', user_id);
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
