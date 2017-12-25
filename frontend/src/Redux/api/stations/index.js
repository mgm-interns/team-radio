import { combineReducers } from 'redux';
import HttpRequest from 'Util/redux/HttpRequest';

export const fetchRequest = new HttpRequest({
  type: 'FETCH_STATIONS',
  method: 'GET',
  endpoint: `${process.env.REACT_APP_SERVER_END_POINT}/stations`,
  initialData: [],
});

export const addRequest = new HttpRequest({
  type: 'ADD_STATION',
  method: 'POST',
  endpoint: `${process.env.REACT_APP_SERVER_END_POINT}/stations`,
  initialData: {},
});

export const fetchStations = fetchRequest.getAction();

export const addStation = addRequest.getAction();

export default combineReducers({
  fetch: fetchRequest.getReducer(),
  add: addRequest.getReducer(),
});
