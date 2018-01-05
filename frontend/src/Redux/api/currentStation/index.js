import {
  SERVER_JOINED_STATION_SUCCESS,
  SERVER_UPDATE_PLAYLIST,
  SERVER_UPDATE_NOW_PLAYING,
  CLIENT_ADD_SONG,
  SERVER_ADD_SONG_FAILURE,
} from 'Redux/actions';

const INITIAL_STATE = {
  station: null,
  playlist: [],
  nowPlaying: {
    url: 'https://www.youtube.com/watch?v=igSCSQ9fg14',
    starting_time: 0,
  },
  tempPlaylist: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // For web socket
    case SERVER_JOINED_STATION_SUCCESS:
      return {
        ...state,
        station: action.payload.station,
        playlist: action.payload.station.playlist,
      };

    case SERVER_UPDATE_PLAYLIST:
      return {
        ...state,
        playlist: action.payload.playlist,
      };

    case SERVER_UPDATE_NOW_PLAYING:
      return {
        ...state,
        nowPlaying: action.payload,
      };
    /**
     * Add the song to playlist if user added a new song
     * Move the old playlist to temp
     */
    case CLIENT_ADD_SONG:
      return {
        ...state,
        tempPlaylist: state.playlist,
        playlist: [...state.playlist, action.payload],
      };
    /**
     * Remove the new song when ADD_SONG action has failed
     * by copy from temp playlist
     */
    case SERVER_ADD_SONG_FAILURE:
      return {
        ...state,
        playlist: [...state.tempPlaylist],
        tempPlaylist: INITIAL_STATE.tempPlaylist,
      };
    default:
      return state;
  }
};
