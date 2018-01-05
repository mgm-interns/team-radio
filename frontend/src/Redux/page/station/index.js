import { SERVER_JOINED_STATION_SUCCESS } from 'Redux/actions';
import { SAVE_SEARCH_INPUT, SET_PREVIEW_VIDEO } from './actions';

const INITIAL_STATE = {
  preview: null,
  searchInput: '',
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
    default:
      return state;
  }
};
