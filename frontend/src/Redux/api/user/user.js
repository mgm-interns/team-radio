import HttpRequest from 'Util/redux/HttpRequest';

const ENDPOINT = process.env.REACT_APP_SERVER_END_POINT;

const getUserRequest = new HttpRequest({
  method: 'POST',
  type: 'FETCH_USER',
  endpoint: `${ENDPOINT}/login`,
  headers: {
    'access-token': localStorage.getItem('token'),
  },
});

const addUserRequest = new HttpRequest({
  method: 'POST',
  type: 'ADD_USER',
  endpoint: `${ENDPOINT}/signup`,
});

const addUserBySocialAccountRequest = new HttpRequest({
  method: 'POST',
  type: 'ADD_USER_BY_SOCIAL',
  endpoint: `${ENDPOINT}/signupWithSocialAccount`,
});

const verifyTokenRequest = new HttpRequest({
  method: 'POST',
  type: 'VERIFY_TOKEN',
  endpoint: `${ENDPOINT}/isVerifidedToken`,
});

export const logout = () => ({
  type: 'LOGOUT_REQUEST',
});

export const getUser = getUserRequest.getAction();
export const addUser = addUserRequest.getAction();
export const addUserBySocialAccount = addUserBySocialAccountRequest.getAction();
export const verifyToken = verifyTokenRequest.getAction();
