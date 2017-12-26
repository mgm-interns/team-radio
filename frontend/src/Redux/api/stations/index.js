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
      return {
        data: [],
        error: { ...action.payload },
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
      return {
        ...state,
        error: { ...action.payload },
        loading: false,
      };
    }
    default:
      return state;
  }
};
