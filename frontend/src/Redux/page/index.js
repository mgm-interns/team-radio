import { combineReducers } from 'redux';

import station from './station';
import landing from './landing';

export default combineReducers({
  station,
  landing,
});
