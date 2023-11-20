import { ApiManager, SUCCESS_CODE } from 'utils';
import LCApiConstant from './LCApiConstant';
const $http = new ApiManager();
// eslint-disable-next-line
export default {
  /**
   * 탐색화면 초기화(추천 그룹, 추천 컨퍼런스)
   * @returns
   */
  getExplorer: async () => {
    try {
      const url = LCApiConstant.GET_EXPLORER;
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
   * 탐색화면 검색
   * @returns
   */
  searchExplorer: async (keyword) => {
    try {
      const url = LCApiConstant.SEARCH_EXPLORER;
      const apiResult = await $http.post(url, { keyword });
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
