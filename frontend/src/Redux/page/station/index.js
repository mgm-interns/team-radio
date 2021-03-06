import { SERVER_JOINED_STATION_SUCCESS } from 'Redux/actions';
import {
  SET_PREVIEW_VIDEO,
  MUTE_VIDEO_REQUEST,
  REPLAY_REQUEST,
  PASSIVE_USER_REQUEST,
  DISABLE_STATIONS_SWITCHER,
  ENABLE_STATIONS_SWITCHER,
} from './actions';

const INITIAL_STATE = {
  joinedStation: false,
  preview: null,
  muteNowPlaying: false,
  mutePreview: true,
  userDid: false,
  replayed: false,
  passive: false,
  disableSwitcher: false,
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
    case REPLAY_REQUEST:
      return {
        ...state,
        replayed: true,
      };
    case PASSIVE_USER_REQUEST:
      return {
        ...state,
        passive: action.payload,
      };
    case DISABLE_STATIONS_SWITCHER:
      return {
        ...state,
        disableSwitcher: true,
      };
    case ENABLE_STATIONS_SWITCHER:
      return {
        ...state,
        disableSwitcher: false,
      };
    default:
      return state;
  }
};
