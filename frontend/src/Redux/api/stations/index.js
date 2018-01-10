import {
  CLIENT_CREATE_STATION,
  SERVER_CHANGE_STATION_THUMBNAIL,
  SERVER_CREATE_STATION_SUCCESS,
  SERVER_STATION_CHANGE_ONLINE_USERS,
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
    case SERVER_CHANGE_STATION_THUMBNAIL: {
      return {
        ...state,
        data: state.data.map(station => {
          const { station_id, thumbnailUrl } = action.payload;
          if (station.station_id === station_id) {
            return {
              ...station,
              thumbnail: thumbnailUrl,
            };
          }
          return station;
        }),
      };
    }

    default:
      return state;
  }
};
