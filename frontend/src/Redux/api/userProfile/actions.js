import HttpRequest from 'Util/redux/HttpRequest';

const ENDPOINT = process.env.REACT_APP_SERVER_END_POINT;

const getUserByUsernameRequest = new HttpRequest({
  method: 'GET',
  type: 'FETCH_USER_BY_USERNAME',
  endpoint: `${ENDPOINT}/profile`,
  headers: {
    'access-token': localStorage.getItem('token'),
  },
});

export const getUserByUsername = getUserByUsernameRequest.getAction();
