import { combineReducers } from 'redux';
import HttpRequest from 'Util/redux/HttpRequest';
import { logout } from 'Redux/api/user/actions';

const ENDPOINT = process.env.REACT_APP_SERVER_END_POINT;

const getUserByUsernameRequest = new HttpRequest({
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

export const getUserByUsername = getUserByUsernameRequest.getAction();
export const setAvatar = setAvatarRequest.getAction();
export const setPassword = setPasswordRequest.getAction();
export const setUsername = setUsernameRequest.getAction();
export const setUserInformation = setUserInformationRequest.getAction();

// const INITIAL_STATE = {
//   data: {},
//   error: null,
//   loading: false,
//   isAuthenticated: !!localStorage.getItem('token'),
//   isOwner: false,
// };

// const userProfile = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case 'FETCH_USER_BY_USERNAME':
//       return {
//         data: {},
//         error: null,
//         loading: true,
//       };
//     case 'FETCH_USER_BY_USERNAME_SUCCESS':
//       return {
//         ...state,
//         data: action.payload,
//         loading: false,
//       };

//     case 'FETCH_USER_BY_USERNAME_FAILURE':
//       return {
//         ...state,
//         loading: false,
//         error: { ...action.payload },
//       };

//     default:
//       return state;
//   }
// };

// export default userProfile;
