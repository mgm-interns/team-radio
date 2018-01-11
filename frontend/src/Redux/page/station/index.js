import { SERVER_JOINED_STATION_SUCCESS } from 'Redux/actions';
import {
  SET_PREVIEW_VIDEO,
  MUTE_VIDEO_REQUEST,
  SAVE_PLAYLIST,
  SAVE_HISTORY,
  REPLAY_REQUEST,
} from './actions';

const INITIAL_STATE = {
  joinedStation: false,
  preview: null,
  muteNowPlaying: false,
  mutePreview: true,
  userDid: false,
  playlist: [],
  history: [],
  replayed: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PREVIEW_VIDEO:
      return {
        ...state,
        preview: action.payload,
      };
    case SERVER_JOINED_STATION_SUCCESS:
      return {
        ...state,
        joinedStation: true,
      };
    case MUTE_VIDEO_REQUEST:
      return {
        ...state,
        muteNowPlaying: action.payload.muteNowPlaying,
        mutePreview: action.payload.mutePreview,
        userDid: action.payload.userDid,
      };
    case SAVE_PLAYLIST:
      return {
        ...state,
        playlist: action.payload,
      };
    case SAVE_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case REPLAY_REQUEST:
      return {
        ...state,
        replayed: true,
      };
    default:
      return state;
  }
};
