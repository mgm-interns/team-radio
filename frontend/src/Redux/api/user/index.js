const INITIAL_STATE = {
  data: { userId: localStorage.getItem('userId') },
  error: null,
  loading: false,
  isAuthenticated: !!localStorage.getItem('token'),
  isOwner: false,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_USER':
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

    case 'ADD_USER':
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
    case 'ADD_USER_WITH_SOCIAL':
      return {
        data: {},
        error: null,
        loading: true,
        isAuthenticated: false,
      };
    case 'ADD_USER_WITH_SOCIAL_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        isAuthenticated: true,
      };

    case 'ADD_USER_WITH_SOCIAL_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
        isAuthenticated: false,
      };
    case 'VERIFY_TOKEN':
      return {
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

    case 'UPDATE_AVATAR':
      return {
        ...state,
      };
    case 'UPDATE_AVATAR_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case 'UPDATE_AVATAR_FAILURE':
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
      };

    default:
      return state;
  }
};

export default user;
