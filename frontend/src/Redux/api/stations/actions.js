import { CALL_API } from 'redux-api-middleware';

export const FETCH_STATIONS = 'FETCH_STATIONS';
export const FETCH_STATIONS_SUCCESS = 'FETCH_STATIONS_SUCCESS';
export const FETCH_STATIONS_FAILURE = 'FETCH_STATIONS_FAILURE';

export const ADD_STATION = 'ADD_STATION';
export const ADD_STATION_SUCCESS = 'ADD_STATION_SUCCESS';
export const ADD_STATION_FAILURE = 'ADD_STATION_FAILURE';

export const fetchStations = () => ({
  [CALL_API]: {
    types: [FETCH_STATIONS, FETCH_STATIONS_SUCCESS, FETCH_STATIONS_FAILURE],
    endpoint: `${process.env.REACT_APP_SERVER_END_POINT}/stations`,
    method: 'GET',
  },
});

export const addStation = data => ({
  [CALL_API]: {
    types: [ADD_STATION, ADD_STATION_SUCCESS, ADD_STATION_FAILURE],
    endpoint: `${process.env.REACT_APP_SERVER_END_POINT}/stations`,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data),
  },
});
