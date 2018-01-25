import remove from 'lodash/remove';
import {
  SERVER_ADD_FAVOURITE_SONG_SUCCESS,
  SERVER_REMOVE_FAVOURITE_SONG_SUCCESS,
  SERVER_FAVOURITE_SONG_FAILURE,
  SERVER_GET_FAVOURITE_SONG_SUCCESS,
  SERVER_GET_FAVOURITE_SONG_FAILURE,
} from 'Redux/actions';

const INITIAL_STATE = {
  requestedSongUrl: '',
  favourite: {
    data: [],
    message: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * Favourite song request (add & remove)
     */
    case SERVER_ADD_FAVOURITE_SONG_SUCCESS: {
      return {
        ...state,
        // isTrigger: false,
        favourite: {
          ...state.favourite,
          data: [...state.favourite.data, action.payload.song],
          message: null,
        },
      };
    }
    case SERVER_REMOVE_FAVOURITE_SONG_SUCCESS: {
      return {
        ...state,
        // isTrigger: false,
        favourite: {
          ...state.favourite,
          data: remove(
            state.favourite.data,
            item => item.url !== action.payload.url,
          ),
          message: null,
        },
      };
    }
    case SERVER_FAVOURITE_SONG_FAILURE:
      return {
        ...state,
        // isTrigger: false,
        favourite: {
          ...state.favourite,
          message: action.payload.message,
        },
      };
    case SERVER_GET_FAVOURITE_SONG_SUCCESS:
      return {
        ...state,
        // isTrigger: false,
        favourite: {
          ...state.favourite,
          data: [...action.payload.songs],
          message: null,
        },
      };
    case SERVER_GET_FAVOURITE_SONG_FAILURE:
      return {
        ...state,
        // isTrigger: false,
        favourite: {
          ...state.favourite,
          message: action.payload.message,
        },
      };
    default:
      return state;
  }
};
