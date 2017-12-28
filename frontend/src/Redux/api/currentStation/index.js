import {
  SERVER_JOINED_STATION_SUCCESS,
  SERVER_JOINED_STATION_FAILURE,
  SERVER_UPDATE_PLAYLIST,
  SERVER_UPDATE_NOW_PLAYING,
} from 'Redux/actions';

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
    case SERVER_JOINED_STATION_SUCCESS:
      return {
        ...state,
        station: action.payload.station,
        playlist: action.payload.playlist,
        nowPlaying: action.payload.nowplaying,
      };

    case SERVER_UPDATE_PLAYLIST:
      return {
        ...state,
        playlist: action.payload.playlist,
      };

    case SERVER_UPDATE_NOW_PLAYING:
      return {
        ...state,
        nowPlaying: action.payload.nowplaying,
      };
    default:
      return state;
  }
};
