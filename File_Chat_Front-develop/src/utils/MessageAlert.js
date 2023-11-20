/* eslint-disable */
/**
 *
 *
 */
import { message } from 'antd';
import { API } from '../api';
import { SUCCESS_CODE } from 'utils';

message.config({
  // top: 100,
  // duration: 2,
  maxCount: 5,
});

export default {
  /** Success */
  success: (m = 'success', time = 1.2) => message.success(m, time),

  /** error */
  error: async (m = 'error', time = 1.2) => {
    await message.error(m, time)
    await alert(m)
    const userInput = await window.prompt('오류가 발생하였습니다.\n발생한 오류에 대해 알려주세요.', '');
    if (userInput !== null) {
      try {
        const body = {
          text: userInput,
          message : m
        }
        const response = await API.sendBugReport(body);
        if (response.code === SUCCESS_CODE) {
          alert('오류 내용 전송에 성공하였습니다')
        }
      } catch(error) {
        message.error(error, time)
      }
    }
  },

  /** warning */
  warning: (m = 'warning', time = 1.2) => message.warning(m, time),
};
