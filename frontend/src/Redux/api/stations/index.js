import {
  FETCH_STATIONS,
  FETCH_STATIONS_SUCCESS,
  FETCH_STATIONS_FAILURE,
} from './actions';

const INITIAL_STATE = {
  data: [],
  error: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_STATIONS:
      return {
        data: [],
        error: null,
        loading: true,
      };
    case FETCH_STATIONS_SUCCESS:
      return {
        data: action.payload,
        error: null,
        loading: false,
      };
    case FETCH_STATIONS_FAILURE: {
      const error = action.payload.data || { message: action.payload.message };
      return {
        data: [],
        error,
        loading: false,
      };
    }
    default:
      return state;
  }
};
