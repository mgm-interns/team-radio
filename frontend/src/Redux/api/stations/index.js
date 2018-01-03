import { CLIENT_CREATE_STATION } from 'Redux/actions';

const INITIAL_STATE = {
  station: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLIENT_CREATE_STATION:
      return {
        ...state,
        station: action.payload,
      };

    default:
      return state;
  }
};
