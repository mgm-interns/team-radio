import { CREATE_STATION } from './actions';

const INITIAL_STATE = {
  station: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_STATION:
      return {
        ...state,
        station: action.payload,
      };

    default:
      return state;
  }
};
