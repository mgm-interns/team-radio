import { loadAuthenticationState } from 'Config';
<<<<<<< HEAD
//import jwt from 'jsonwebtoken';
=======
>>>>>>> 5ba2e4e1ba7612fc26db5ebb8e23140c709a226a

const INITIAL_STATE = {
  // data: localTokenToData(),
  data: {},
  error: null,
  loading: false,
  isAuthenticated: !!localStorage.getItem('token'),
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
    default:
      return state;
  }
};

export default user;
