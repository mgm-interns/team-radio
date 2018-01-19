import HttpRequest from 'Util/redux/HttpRequest';
import { combineReducers } from 'redux';

const ENDPOINT = process.env.REACT_APP_SERVER_END_POINT;

const getVisitorByUsernameRequest = new HttpRequest({
  method: 'GET',
  type: 'FETCH_VISITOR_BY_USERNAME',
  endpoint: `${ENDPOINT}/profile`,
  headers: {
    'access-token': localStorage.getItem('token'),
  },
});

const getStationsByUserIdRequest = new HttpRequest({
  method: 'GET',
  type: 'FETCH_STATIONS_BY_USER_ID',
  endpoint: `${ENDPOINT}/stations/getstationbyuserid`,
});

const getRecentStationsByUserIdRequest = new HttpRequest({
  method: 'GET',
  type: 'FETCH_RECENT_STATIONS_BY_USER_ID',
  endpoint: `${ENDPOINT}/stations/getstationbyadded`,
});

export const getStationsByUserId = getStationsByUserIdRequest.getAction();
export const getRecentStationsByUserId = getRecentStationsByUserIdRequest.getAction();
export const getVisitorByUsername = getVisitorByUsernameRequest.getAction();

export default combineReducers({
  visitor: getVisitorByUsernameRequest.getReducer(),
  all: getStationsByUserIdRequest.getReducer(),
  recent: getRecentStationsByUserIdRequest.getReducer(),
});
