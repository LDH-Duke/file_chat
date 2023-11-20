import dotenv from 'dotenv';
dotenv.config();

export { default as ApiManager } from './ApiManager';
export { default as MessageAlert } from './MessageAlert';
export { default as TypeManager } from './TypeManager';

// export const PUBLIC_URL = 'http://localhost:3000';
export const PUBLIC_URL = 'localhost';
// export const PUBLIC_URL = '192.168.0.29';
// export const BACKEND_URL = `http://192.168.0.29:3333`;
export const BACKEND_URL = `http://localhost:3333`;

export const getCookie = (name, options = null) => {
  const value = window.document.cookie.match(
    '(^|;) ?' + name + '=([^;]*)(;|$)'
  );
  return value ? decodeURIComponent(value[2]) : null;
};
// setCookie
export const setCookie = (name, value, expires = 1, callback = false) => {
  var date = new Date();
  date.setTime(date.getTime() + expires * 1000 * 60 * 60 * 24);
  window.document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()}; path=/`;
  if (callback) callback();
};

// clearCookie
// export const deleteCookie = (name, { path, domain }) => {
export const deleteCookie = (name) => {
  var date = new Date();
  date.setTime(date.getTime() - 1000);
  if (getCookie(name)) {
    window.document.cookie = `${name}=;path=/;domain=http://fchat.codebrewing.org; expires=${date.toUTCString()};`;
    // window.document.cookie =
    //   name +
    //   '=' +
    //   (path ? ';path=' + path : '') +
    //   (domain ? ';domain=' + domain : '') +
    //   ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
};

/**
 * API파라미터 Replace함수
 * --
 */
export const parameterToPath = (path, params = {}) => {
  const keys = Object.keys(params);
  let newStr = path;
  for (let key of keys) {
    newStr = newStr.replace(`:${key}`, params[key]);
  }
  return newStr;
};

// API Status Code
export const SUCCESS_CODE = 200;
export const FAILURE_CODE = 400;

const deployType = process.env.REACT_APP_DEPLOY_TYPE
  ? process.env.REACT_APP_DEPLOY_TYPE
  : process.env.NODE_ENV;

export const HOST_URL = process.env.REACT_APP_HOST_URL;

export const envType = deployType;
