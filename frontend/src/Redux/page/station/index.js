import { SERVER_JOINED_STATION_SUCCESS } from 'Redux/actions';
import {
  SAVE_SEARCH_INPUT,
  SET_PREVIEW_VIDEO,
  MUTE_NOW_PLAYING,
  MUTE_PREVIEW,
} from './actions';

const INITIAL_STATE = {
  preview: null,
  searchInput: '',
  mutedNowPlaying: false,
  mutedPreview: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.payload,
      };
    case SET_PREVIEW_VIDEO:
      return {
        ...state,
        preview: action.payload,
      };
    case SERVER_JOINED_STATION_SUCCESS:
      return {
        ...state,
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
    default:
      return state;
  }
};
