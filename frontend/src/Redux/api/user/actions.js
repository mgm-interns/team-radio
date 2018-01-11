import { CALL_API } from 'redux-api-middleware';

export const fetchUser = data => ({
  [CALL_API]: {
    types: ['FETCH_USER', 'FETCH_USER_SUCCESS', 'FETCH_USER_FAILURE'],
    endpoint: `${process.env.REACT_APP_SERVER_END_POINT}/login`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  },
});

export const addUser = data => ({
  [CALL_API]: {
    types: ['ADD_USER', 'ADD_USER_SUCCESS', 'ADD_USER_FAILURE'],
    endpoint: `${process.env.REACT_APP_SERVER_END_POINT}/signup`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  },
});

export const addUserWithSocialAccount = data => ({
  [CALL_API]: {
    types: [
      'ADD_USER_WITH_SOCIAL',
      'ADD_USER_WITH_SOCIAL_SUCCESS',
      'ADD_USER_WITH_SOCIAL_FAILURE',
    ],
    endpoint: `${
      process.env.REACT_APP_SERVER_END_POINT
    }/signupWithSocialAccount`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  },
});

export const verifyToken = () => ({
  [CALL_API]: {
    types: ['VERIFY_TOKEN', 'VERIFY_TOKEN_SUCCESS', 'VERIFY_TOKEN_FAILURE'],
    endpoint: `${process.env.REACT_APP_SERVER_END_POINT}/isVerifidedToken`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('token') }),
  },
});

export const updateAvatar = avatar_url => ({
  [CALL_API]: {
    types: ['UPDATE_AVATAR', 'UPDATE_AVATAR_SUCCESS', 'UPDATE_AVATAR_FAILURE'],
    endpoint: `${process.env.REACT_APP_SERVER_END_POINT}/setAvatar`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify({
      userId: localStorage.getItem('userId'),
      avatar_url,
    }),
  },
});

export const logout = () => ({
  type: 'LOGOUT_REQUEST',
});

export const fetchUserWithUsername = username => ({
  [CALL_API]: {
    types: ['FETCH_USER_PROFILE', 'FETCH_USER_SUCCESS', 'FETCH_USER_FAILURE'],
    endpoint: `${process.env.REACT_APP_SERVER_END_POINT}/Profile/${username}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('token'),
    },
  },
});
