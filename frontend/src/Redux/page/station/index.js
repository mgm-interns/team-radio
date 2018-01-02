import { SET_PREVIEW_VIDEO } from './actions';

const INITIAL_STATE = {
  preview: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PREVIEW_VIDEO:
      return {
        ...state,
        preview: action.payload,
      };

    default:
      return state;
  }
};
