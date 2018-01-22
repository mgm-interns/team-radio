import includes from 'lodash/includes';
import { appNotificationInstance } from 'Component/Notification/AppNotification';
import {
  CLIENT_FAVOURITE_SONG,
  SERVER_ADD_FAVOURITE_SONG_SUCCESS,
  SERVER_REMOVE_FAVOURITE_SONG_SUCCESS,
  SERVER_FAVOURITE_SONG_FAILURE,
  SERVER_GET_FAVOURITE_SONG_SUCCESS,
  SERVER_GET_FAVOURITE_SONG_FAILURE,
} from 'Redux/actions';

const INITIAL_STATE = {
  favourite: {
    trigger: false,
    favouriteSuccess: false,
    unFavouriteSuccess: false,
    actionResult: null,
    data: [],
    message: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * Favourite song request (add & remove)
     */
    case CLIENT_FAVOURITE_SONG:
      return {
        ...state,
        favourite: {
          ...state.favourite,
          trigger: true,
        },
      };
    case SERVER_ADD_FAVOURITE_SONG_SUCCESS: {
      return {
        ...state,
        favourite: {
          ...state.favourite,
          trigger: false,
          favouriteSuccess: true,
          unFavouriteSuccess: false,
          actionResult: { ...action.payload.song },
        },
      };
    }
    case SERVER_REMOVE_FAVOURITE_SONG_SUCCESS: {
      return {
        ...state,
        favourite: {
          ...state.favourite,
          trigger: false,
          favouriteSuccess: false,
          unFavouriteSuccess: true,
          actionResult: { ...action.payload },
        },
      };
    }
    case SERVER_FAVOURITE_SONG_FAILURE:
      return {
        ...state,
        favourite: {
          ...state.favourite,
          trigger: false,
          favouriteSuccess: INITIAL_STATE.favourite.favouriteSuccess,
          unFavouriteSuccess: INITIAL_STATE.favourite.unFavouriteSuccess,
          actionResult: INITIAL_STATE.favourite.actionResult,
          message: action.payload.message,
        },
      };
    case SERVER_GET_FAVOURITE_SONG_SUCCESS:
      return {
        ...state,
        favourite: {
          ...state.favourite,
          data: [...state.favourite.data, ...action.payload.songs],
        },
      };
    case SERVER_GET_FAVOURITE_SONG_FAILURE:
      return {
        ...state,
        favourite: {
          ...state.favourite,
          message: action.payload.message,
        },
      };
    default:
      return state;
  }
};
