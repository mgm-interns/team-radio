import { combineReducers } from 'redux';

import stations from './stations';
import currentStation from './currentStation';
import user from './user';
import userStations from './userProfile/stations';
import userProfile from './userProfile';

export default combineReducers({
  stations,
  currentStation,
  user,
  userStations,
  userProfile,
});
