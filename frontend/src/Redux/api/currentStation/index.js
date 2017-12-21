import { SERVER_JOINED_STATION, SERVER_UPDATE_STATION } from './actions';
import playlist from './fixtures';

const INITIAL_STATE = {
  playlist,
  nowPlaying: {
    url: 'https://www.youtube.com/watch?v=igSCSQ9fg14',
    start: new Date(),
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SERVER_JOINED_STATION:
      return {
        ...state,
        playlist: action.payload.playlist,
        nowPlaying: action.payload.nowplaying,
      };

    case SERVER_UPDATE_STATION:
      return {
        ...state,
        playlist: action.payload.playlist,
        nowPlaying: action.payload.nowplaying,
      };
    default:
      return state;
  }
};
