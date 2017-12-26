import { combineReducers } from 'redux';

import stations from './stations';
import currentStation from './currentStation';

export default combineReducers({
  stations,
  currentStation,
});
