import { combineReducers } from 'redux';
import HttpRequest from 'Util/redux/HttpRequest';

export const fetchRequest = new HttpRequest({
  type: 'FETCH_USER',
  method: 'POST',
  endpoint: `${process.env.REACT_APP_SERVER_END_POINT}/login`,
  initialData: [],
});

export const addRequest = new HttpRequest({
  type: 'ADD_USER',
  method: 'POST',
  endpoint: `${process.env.REACT_APP_SERVER_END_POINT}/signup`,
  initialData: {},
});

export const fetchUser = fetchRequest.getAction();

export const addUser = addRequest.getAction();

export default combineReducers({
  fetch: fetchRequest.getReducer(),
  add: addRequest.getReducer(),
});
