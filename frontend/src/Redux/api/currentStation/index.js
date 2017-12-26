import playlist from './fixtures';
import {
  SERVER_JOINED_STATION_SUCESS,
  SERVER_UPDATE_PLAYLIST,
  SERVER_CREATE_STATION_SUCESS,
} from '../../../../lib/actions';

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
    case SERVER_JOINED_STATION_SUCESS:
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
        nowPlaying: action.payload.nowplaying,
      };
    // For Friday demo
    case SERVER_CREATE_STATION_SUCESS:
      return {
        ...state,
        station: action.payload.data,
      };
    default:
      return state;
  }
};
