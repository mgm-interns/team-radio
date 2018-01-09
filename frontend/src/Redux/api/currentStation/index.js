import {
  SERVER_JOINED_STATION_SUCCESS,
  SERVER_UPDATE_PLAYLIST,
  SERVER_UPDATE_NOW_PLAYING,
  CLIENT_ADD_SONG,
  SERVER_ADD_SONG_FAILURE,
  SERVER_NEW_USER_JOINED,
  SERVER_DOWNVOTE_SONG_FAILURE,
  SERVER_UPVOTE_SONG_FAILURE,
  SERVER_JOINED_STATION_FAILURE,
  CLIENT_LEAVE_STATION,
  CLIENT_JOIN_STATION,
} from 'Redux/actions';
import { appNotificationInstance } from 'Component/Notification/AppNotification';

const INITIAL_STATE = {
  station: null,
  playlist: [],
  nowPlaying: {
    url: 'https://www.youtube.com/watch?v=igSCSQ9fg14',
    starting_time: 0,
  },
  tempPlaylist: [],
  joined: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // For web socket
    case SERVER_JOINED_STATION_SUCCESS:
      return {
        ...state,
        station: action.payload.station,
        playlist: action.payload.station.playlist,
        joined: true,
      };

    case SERVER_JOINED_STATION_FAILURE:
      return {
        ...INITIAL_STATE,
      };

    case CLIENT_JOIN_STATION:
      return {
        ...INITIAL_STATE,
        station: {
          id: action.payload.stationId,
        },
      };

    case CLIENT_LEAVE_STATION:
      return {
        ...INITIAL_STATE,
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
     * Notify when a new user join
     */
    case SERVER_NEW_USER_JOINED:
      appNotificationInstance.info({
        message: action.payload && `${action.payload.user} has joined!`,
      });
      return state;
    case SERVER_UPVOTE_SONG_FAILURE:
      appNotificationInstance.info({
        message: action.payload && action.payload.message,
      });
      return state;
    case SERVER_DOWNVOTE_SONG_FAILURE:
      appNotificationInstance.info({
        message: action.payload && action.payload.message,
      });
      return state;
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
      appNotificationInstance.warning({
        message: action.payload && action.payload.message,
      });
      return {
        ...state,
        playlist: [...state.tempPlaylist],
        tempPlaylist: INITIAL_STATE.tempPlaylist,
      };
    default:
      return state;
  }
};
