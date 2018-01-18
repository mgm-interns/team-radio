import { combineReducers } from 'redux';
import HttpRequest from 'Util/redux/HttpRequest';

const ENDPOINT = process.env.REACT_APP_SERVER_END_POINT;

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

export default combineReducers({
  all: getStationsByUserIdRequest.getReducer(),
  recent: getRecentStationsByUserIdRequest.getReducer(),
});
