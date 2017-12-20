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
    case 'SERVER:JOINED_STATION':
      return {
        ...state,
        playlist: action.payload.playlist,
        nowPlaying: action.payload.nowplaying,
      };

    case 'SERVER:UPDATE_STATION':
      return {
        ...state,
        playlist: action.payload.playlist,
        nowPlaying: action.payload.nowplaying,
      };
    default:
      return state;
  }
};
