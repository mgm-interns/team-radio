import { combineReducers } from 'redux';

import stations from './stations';
import currentStation from './currentStation';
import user from './user';

export default combineReducers({
  stations,
  currentStation,
  user,
});
