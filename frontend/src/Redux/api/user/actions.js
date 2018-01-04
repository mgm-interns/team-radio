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

export const logout = () => ({
  type: 'LOGOUT_REQUEST',
});
