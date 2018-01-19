import { combineReducers } from 'redux';

import stations from './stations';
import currentStation from './currentStation';
import user from './user';
import userStations from './user/stations';
import userProfile from './userProfile';
import favouriteSongs from './favouriteSongs';

export default combineReducers({
  stations,
  currentStation,
  user,
  userStations,
  userProfile,
  favouriteSongs,
});
