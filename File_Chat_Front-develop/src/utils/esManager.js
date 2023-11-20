/* eslint-disable */
/**
 * 객체의 속성 갯수를 반환
 * @param { Object } obj 갯수를 알고 싶은 객체
 */
export const getObjectSize = (obj) => {
  let size = 0;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
/**
 * 쿼리 파라미터 값을 가져온다.
 * @param {*} key 가져올 쿼리 파라미터 속성 이름
 */
export const getUrlParameter = (key) => {
  key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
  let results = regex.exec(window.location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
