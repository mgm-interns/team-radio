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
    'Content-Type': 'application/json',
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
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('token'),
  },
  // payload: { userId, oldPassword, newPassword },
});

const setUsernameRequest = new HttpRequest({
  method: 'POST',
  type: 'SET_USERNAME',
  endpoint: `${ENDPOINT}/setUsername`,
  headers: {
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('token'),
  },
  // payload: { userId, username },
});

export const getUserByUsername = gethUserByUsernameRequest.getAction();
export const setAvatar = setAvatarRequest.getAction();
export const setPassword = setPasswordRequest.getAction();
export const setUsername = setUsernameRequest.getAction();

export default combineReducers({
  avatar: setAvatarRequest.getReducer(),
  password: setPasswordRequest.getReducer(),
  username: setUsernameRequest.getReducer(),
  user: gethUserByUsernameRequest.getReducer(),
});
