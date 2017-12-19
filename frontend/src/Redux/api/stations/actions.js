import { CALL_API } from 'redux-api-middleware';

export const FETCH_STATIONS = 'FETCH_STATIONS';
export const FETCH_STATIONS_SUCCESS = 'FETCH_STATIONS_SUCCESS';
export const FETCH_STATIONS_FAILURE = 'FETCH_STATIONS_FAILURE';

export const ADD_STATION = 'ADD_STATION';
export const ADD_STATION_SUCCESS = 'ADD_STATION_SUCCESS';
export const ADD_STATION_FAILURE = 'ADD_STATION_SUCCESS';

export const DELETE_STATION = 'DELETE_STATION';
export const DELETE_STATION_SUCCESS = 'DELETE_STATION_SUCCESS';
export const DELETE_STATION_FAILURE = 'DELETE_STATION_FAILURE';

export const fetchStations = () => ({
  [CALL_API]: {
    types: [FETCH_STATIONS, FETCH_STATIONS_SUCCESS, FETCH_STATIONS_FAILURE],
    endpoint: 'http://localhost:8080/api/dummy',
    method: 'GET',
  },
});
