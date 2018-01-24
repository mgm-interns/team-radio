import includes from 'lodash/includes';
import { appNotificationInstance } from 'Component/Notification/AppNotification';
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
  CLIENT_JOIN_STATION,
  SERVER_UPDATE_ONLINE_USERS,
  CLIENT_LEAVE_STATION,
  SERVER_USER_LEFT,
  SERVER_SKIP_SONG,
  SERVER_UPDATE_SKIPPED_SONGS,
  SERVER_NO_MULTI_STATIONS,
  SERVER_UPDATE_HISTORY,
} from 'Redux/actions';

const INITIAL_STATE = {
  station: null,
  playlist: [],
  tempPlaylist: [],
  history: [],
  skipList: [],
  nowPlaying: {
    url: '',
    starting_time: 0,
  },
  skip: {
    _id: new Date().getTime(),
    delay: 0,
  },
  users: [],
  online_count: 0,
  joined: {
    loading: false,
    success: false,
    failed: false,
    loggedInStation: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * Station information actions
     */
    case CLIENT_JOIN_STATION:
      return {
        ...state,
        station: {
          station_id: action.payload.stationId,
        },
        joined: {
          ...state,
          loading: true,
          success: false,
          failed: false,
        },
      };
    case SERVER_JOINED_STATION_SUCCESS:
      return {
        ...state,
        station: action.payload.station,
        joined: {
          loading: false,
          success: true,
          failed: false,
          loggedInStation: null,
        },
      };

    case SERVER_JOINED_STATION_FAILURE:
      return {
        ...INITIAL_STATE,
        joined: {
          loading: false,
          success: false,
          failed: true,
          loggedInStation: null,
        },
      };
    case SERVER_NO_MULTI_STATIONS: {
      appNotificationInstance.warning({
        message: `You are logging in station ${
          action.payload.stationName
        }. You will be redirected to that station after 5 seconds.`,
      });
      return {
        ...state,
        joined: {
          loading: false,
          success: false,
          failed: true,
          loggedInStation: {
            stationId: action.payload.stationId,
            stationName: action.payload.stationName,
          },
        },
      };
    }
    case CLIENT_LEAVE_STATION:
      return {
        ...INITIAL_STATE,
      };

    case SERVER_UPDATE_ONLINE_USERS:
      return {
        ...state,
        online_count: action.payload.online_count,
        users: action.payload.users,
      };
    /**
     * Update playlist
     */
    case SERVER_UPDATE_PLAYLIST:
      return {
        ...state,
        playlist: action.payload.playlist.map(song => {
          let willBeSkipped = false;
          if (includes(state.skipList, song.song_id)) {
            willBeSkipped = true;
          }
          return {
            ...song,
            willBeSkipped,
          };
        }),
      };
    /**
     * Update history
     */
    case SERVER_UPDATE_HISTORY:
      return {
        ...state,
        history: action.payload.history,
      };

    /**
     * Update now playing
     */
    case SERVER_UPDATE_NOW_PLAYING:
      return {
        ...state,
        nowPlaying: action.payload,
      };

    /**
     * Skip song
     */
    case SERVER_SKIP_SONG:
      return {
        ...state,
        skip: {
          _id: new Date().getTime(),
          delay: action.payload.delay,
          thumbnail: action.payload.now_playing.thumbnail,
        },
      };
    case SERVER_UPDATE_SKIPPED_SONGS:
      return {
        ...state,
        skipList: action.payload,
        playlist: state.playlist.map(song => {
          let willBeSkipped = false;
          if (includes(action.payload, song.song_id)) {
            willBeSkipped = true;
          }
          return {
            ...song,
            willBeSkipped,
          };
        }),
      };
    /**
     * Notify when a new user join
     */
    case SERVER_NEW_USER_JOINED:
      appNotificationInstance.info({
        message: `${action.payload.user} has joined!`,
      });
      return state;
    case SERVER_USER_LEFT:
      appNotificationInstance.info({
        message: `${action.payload.user} has left!`,
      });
      return state;
    /**
     * Show notification when fail
     */
    case SERVER_UPVOTE_SONG_FAILURE:
      appNotificationInstance.info({
        message: action.payload.message,
      });
      return state;
    case SERVER_DOWNVOTE_SONG_FAILURE:
      appNotificationInstance.info({
        message: action.payload.message,
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
        message: action.payload.message,
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
