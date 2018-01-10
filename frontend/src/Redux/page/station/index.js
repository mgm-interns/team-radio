import { SERVER_JOINED_STATION_SUCCESS } from 'Redux/actions';
import {
  SET_PREVIEW_VIDEO,
  MUTE_NOW_PLAYING,
  MUTE_PREVIEW,
  SAVE_SEARCH_INPUT,
} from './actions';

const INITIAL_STATE = {
  joinedStation: false,
  preview: null,
  mutedNowPlaying: false,
  mutedPreview: false,
  searchInput: '',
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
    case MUTE_NOW_PLAYING:
      return {
        ...state,
        mutedNowPlaying: action.payload,
      };
    case MUTE_PREVIEW:
      return {
        ...state,
        mutedPreview: action.payload,
      };
    case SAVE_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.payload,
      };
    default:
      return state;
  }
};
