import {
  CLIENT_CREATE_STATION,
  SERVER_CHANGE_STATION_THUMBNAIL,
  SERVER_CREATE_STATION_SUCCESS,
  SERVER_UPDATE_STATIONS,
  SERVER_CREATE_STATION_FAILURE,
  SERVER_LOAD_STATION_PAGING,
} from 'Redux/actions';

export const STATION_LOADING_LIMIT = 10;
export const STATION_LOADING_AS_DEFAULT = 10;

const INITIAL_STATE = {
  station: null,
  data: [],
  message: '',
  loadedStation: STATION_LOADING_AS_DEFAULT,
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
        message: '',
      };
    case SERVER_CREATE_STATION_FAILURE:
      return {
        ...state,
        station: null,
        message: action.payload.message,
      };
    case SERVER_UPDATE_STATIONS:
      return {
        ...state,
        data: action.payload.stations,
      };
    /*
    case SERVER_STATION_CHANGE_ONLINE_USERS: {
      return {
        ...state,
        data: state.data.map(station => {
          const { station_id, online_count } = action.payload;
          if (station.station_id === station_id) {
            return {
              ...station,
              online_count,
            };
          }
          return station;
        }),
      };
    }
    */
    case SERVER_CHANGE_STATION_THUMBNAIL: {
      return {
        ...state,
        data: state.data.map(station => {
          const { station_id, thumbnail } = action.payload;
          if (station.station_id === station_id) {
            return { ...station, thumbnail };
          }
          return station;
        }),
      };
    }
    case SERVER_LOAD_STATION_PAGING: {
      const loadedStation = state.loadedStation + STATION_LOADING_LIMIT;
      return {
        ...state,
        loadedStation,
        data: action.payload.stations,
      };
    }

    default:
      return state;
  }
};
