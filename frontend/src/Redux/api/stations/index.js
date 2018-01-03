import {
  CLIENT_CREATE_STATION,
  SERVER_CREATE_STATION_SUCCESS,
  SERVER_UPDATE_STATIONS,
} from 'Redux/actions';

const INITIAL_STATE = {
  station: null,
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENT_CREATE_STATION:
      return {
        ...state,
      };
    case SERVER_CREATE_STATION_SUCCESS:
      return {
        ...state,
        station: action.payload.station,
      };
    case SERVER_UPDATE_STATIONS:
      return {
        ...state,
        data: action.payload.stations,
      };
    default:
      return state;
  }
};
