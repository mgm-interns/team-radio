const INITIAL_STATE = {
  data: {
    userId: localStorage.getItem('userId'),
  },
  error: null,
  loading: false,
  isAuthenticated: !!localStorage.getItem('token'),
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_USER_REQUEST':
      return {
        data: {},
        error: null,
        loading: true,
        isAuthenticated: false,
      };
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        isAuthenticated: true,
      };

    case 'FETCH_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
        isAuthenticated: false,
      };

    case 'ADD_USER_REQUEST':
      return {
        data: {},
        error: null,
        loading: true,
        isAuthenticated: false,
      };
    case 'ADD_USER_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        isAuthenticated: true,
      };

    case 'ADD_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
        isAuthenticated: false,
      };
    case 'ADD_USER_BY_SOCIAL_REQUEST':
      return {
        data: {},
        error: null,
        loading: true,
        isAuthenticated: false,
      };
    case 'ADD_USER_BY_SOCIAL_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        isAuthenticated: true,
      };

    case 'ADD_USER_BY_SOCIAL_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
        isAuthenticated: false,
      };
    case 'VERIFY_TOKEN_REQUEST':
      return {
        ...state,
        data: {},
        error: null,
        loading: true,
        isAuthenticated: false,
      };
    case 'VERIFY_TOKEN_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        isAuthenticated: true,
      };

    case 'VERIFY_TOKEN_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
        isAuthenticated: false,
      };

    case 'LOGOUT_REQUEST':
      return {
        ...state,
        data: {},
        isAuthenticated: false,
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
        data: { ...state.data, message: '' },
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

    case 'SET_AVATAR_REQUEST':
      return {
        ...state,
        error: null,
        loading: true,
      };
    case 'SET_AVATAR_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case 'SET_AVATAR_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
      };

    case 'FORGOT_PASSWORD_REQUEST':
      return {
        data: null,
        error: null,
        loading: true,
      };
    case 'FORGOT_PASSWORD_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case 'FORGOT_PASSWORD_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
      };
    case 'RESET_PASSWORD_REQUEST':
      return {
        data: null,
        error: null,
        loading: true,
      };
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case 'RESET_PASSWORD_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
      };

    default:
      return state;
  }
};

export default userReducer;
