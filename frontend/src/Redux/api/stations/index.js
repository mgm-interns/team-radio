import {
  FETCH_STATIONS,
  FETCH_STATIONS_SUCCESS,
  FETCH_STATIONS_FAILURE,
  ADD_STATION,
  ADD_STATION_SUCCESS,
  ADD_STATION_FAILURE,
} from './actions';

const INITIAL_STATE = {
  data: [],
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /**
     * Fetch stations
     */
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
      const error = { message: action.payload.message };
      return {
        data: [],
        error,
        loading: false,
      };
    }
    /**
     * Add new station
     */
    case ADD_STATION:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ADD_STATION_SUCCESS:
      /**
       * TODO: Handle the change of data
       */
      return {
        data: [...state.data, action.payload],
        error: null,
        loading: false,
      };
    case ADD_STATION_FAILURE: {
      const error = { message: action.payload.message };
      return {
        ...state,
        error,
        loading: false,
      };
    }
    default:
      return state;
  }
};
