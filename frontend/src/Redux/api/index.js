import { combineReducers } from 'redux';

import stations from './stations';
import currentStation from './currentStation';
import user from './user';
import userStations from './user/stations';

export default combineReducers({
  stations,
  currentStation,
  user,
  userStations,
});
