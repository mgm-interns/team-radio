import HttpRequest from 'Util/redux/HttpRequest';

const ENDPOINT = process.env.REACT_APP_SERVER_END_POINT;

const setAvatarRequest = new HttpRequest({
  method: 'POST',
  type: 'SET_AVATAR',
  headers: {
    'access-token': localStorage.getItem('token'),
  },
  endpoint: `${ENDPOINT}/setAvatar`,
  // payload: { userId, avatar_url },
});

const setPasswordRequest = new HttpRequest({
  method: 'POST',
  type: 'SET_PASSWORD',
  endpoint: `${ENDPOINT}/setPassword`,
  headers: {
    'access-token': localStorage.getItem('token'),
  },
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

const setCoverRequest = new HttpRequest({
  method: 'POST',
  type: 'SET_COVER',
  endpoint: `${ENDPOINT}/setCover`,
});

export const setAvatar = setAvatarRequest.getAction();
export const setPassword = setPasswordRequest.getAction();
export const setUsername = setUsernameRequest.getAction();
export const setUserInformation = setUserInformationRequest.getAction();
export const setCover = setCoverRequest.getAction();
