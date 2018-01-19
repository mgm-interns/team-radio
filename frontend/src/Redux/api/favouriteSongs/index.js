const INITIAL_STATE = {
  data: [],
  error: null,
  loading: false,
};

const favoriteSongsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_FAVOURITE_SONGS_BY_USER_ID_REQUEST':
      return {
        ...state,
        error: null,
        loading: true,
      };

    case 'FETCH_FAVOURITE_SONGS_BY_USER_ID_SUCCESS':
      return {
        ...state,
        data: [...action.payload],
        loading: false,
      };

    case 'FETCH_FAVOURITE_SONGS_BY_USER_ID_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
      };
    default:
      return state;
  }
};

export default favoriteSongsReducer;
