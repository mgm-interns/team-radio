import { REDIRECT_TO_STATION_PAGE_REQUEST } from './actions';

const INITIAL_STATE = {
  isRedirect: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REDIRECT_TO_STATION_PAGE_REQUEST:
      return {
        ...state,
        isRedirect: action.payload.isRedirect,
      };

    default:
      return state;
  }
};
