import { SERVER_JOINED_STATION, SERVER_UPDATE_STATION } from './actions';
import { ADD_STATION_SUCCESS } from '../stations/actions';

import playlist from './fixtures';

const INITIAL_STATE = {
  station: null,
  playlist,
  nowPlaying: {
    url: 'https://www.youtube.com/watch?v=igSCSQ9fg14',
    start: new Date(),
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // For websocket
    case SERVER_JOINED_STATION:
      return {
        ...state,
        station: action.payload.station,
        playlist: action.payload.playlist,
        nowPlaying: action.payload.nowplaying,
      };

    case SERVER_UPDATE_STATION:
      return {
        ...state,
        playlist: action.payload.playlist,
        nowPlaying: action.payload.nowplaying,
      };
    // For Friday demo
    case ADD_STATION_SUCCESS:
      return {
        ...state,
        station: action.payload.data,
      };
    default:
      return state;
  }
};
