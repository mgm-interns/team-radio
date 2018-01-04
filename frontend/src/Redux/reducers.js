import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import api from './api';
import page from './page';

export default combineReducers({
  api,
  page,
  form: formReducer, // Initialize redux form
});
