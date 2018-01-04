import { loadAuthenticationState } from 'Config'

const INITIAL_STATE = {
  data: {},
  error: null,
  loading: false,
  isAuthenticated: !!localStorage.getItem('authentication'),
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

    case 'LOGOUT_REQUEST':
      return {
        ...state,
        data: {},
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default user;
