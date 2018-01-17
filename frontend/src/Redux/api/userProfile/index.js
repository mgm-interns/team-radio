const INITIAL_STATE = {
  data: {},
  error: null,
  loading: false,
};

const userProfile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_USER_BY_USERNAME_REQUEST':
      return {
        data: {},
        error: null,
        loading: true,
      };
    case 'FETCH_USER_BY_USERNAME_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case 'FETCH_USER_BY_USERNAME_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
      };

    case 'SET_USERNAME_REQUEST':
      return {
        ...state,
        error: null,
        loading: true,
      };
    case 'SET_USERNAME_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case 'SET_USERNAME_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
      };

    case 'SET_PASSWORD_REQUEST':
      return {
        ...state,
        error: null,
        loading: true,
      };
    case 'SET_PASSWORD_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case 'SET_PASSWORD_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
      };

    case 'SET_USER_INFORMATION_REQUEST':
      return {
        ...state,
        error: null,
        loading: true,
      };
    case 'SET_USER_INFORMATION_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case 'SET_USER_INFORMATION_FAILURE':
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
