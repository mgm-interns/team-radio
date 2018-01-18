const INITIAL_STATE = {
  data: {},
  error: null,
  loading: false,
};

const userProfile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_USER_BY_USERNAME_REQUEST':
      return {
        ...state,
        data: {},
        error: null,
        loading: true,
      };

    case 'FETCH_USER_BY_USERNAME_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      };

    case 'FETCH_USER_BY_USERNAME_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
      };

    default:
      return state;
  }
};

export default userProfile;
