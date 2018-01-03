import { CLIENT_CREATE_STATION, SERVER_UPDATE_STATIONS } from 'Redux/actions';

const INITIAL_STATE = {
  station: null,
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENT_CREATE_STATION:
      return {
        ...state,
        station: action.payload,
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
