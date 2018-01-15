import { combineReducers } from 'redux';
import HttpRequest from 'Util/redux/HttpRequest';

const ENDPOINT = process.env.REACT_APP_SERVER_END_POINT;

const gethUserByUsernameRequest = new HttpRequest({
  method: 'GET',
  type: 'FETCH_USER_BY_USERNAME',
  endpoint: `${ENDPOINT}/Profile`,
  headers: {
    'access-token': localStorage.getItem('token'),
  },
});

const setAvatarRequest = new HttpRequest({
  method: 'POST',
  type: 'UPDATE_AVATAR',
  headers: {
    'access-token': localStorage.getItem('token'),
  },
  endpoint: `${ENDPOINT}/setAvatar`,
  // payload: { userId, avatar_url },
});

const setPasswordRequest = new HttpRequest({
  method: 'POST',
  type: 'UPDATE_PASSWORD',
  endpoint: `${ENDPOINT}/updatePassword`,
  headers: {
    'access-token': localStorage.getItem('token'),
  },
  // payload: { userId, oldPassword, newPassword },
});

const setUsernameRequest = new HttpRequest({
  method: 'POST',
  type: 'SET_USERNAME',
  endpoint: `${ENDPOINT}/setUsername`,
  headers: {
    'access-token': localStorage.getItem('token'),
  },
  // payload: { userId, username },
});

const setUserInformationRequest = new HttpRequest({
  method: 'POST',
  type: 'SET_USER_INFORMATION',
  endpoint: `${ENDPOINT}/setUserInformation`,
  headers: {
    'access-token': localStorage.getItem('token'),
  },
});

export const getUserByUsername = gethUserByUsernameRequest.getAction();
export const setAvatar = setAvatarRequest.getAction();
export const setPassword = setPasswordRequest.getAction();
export const setUsername = setUsernameRequest.getAction();
export const setUserInformation = setUserInformationRequest.getAction();

export default combineReducers({
  avatar: setAvatarRequest.getReducer(),
  password: setPasswordRequest.getReducer(),
  username: setUsernameRequest.getReducer(),
  information: setUserInformationRequest.getReducer(),
  user: gethUserByUsernameRequest.getReducer(),
});
