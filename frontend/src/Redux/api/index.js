import { combineReducers } from 'redux';

import stations from './stations';
import currentStation from './currentStation';
import user from './user';
import visitor from './visitor';
import skipRule from './skipRule';
import favouriteSongs from './favouriteSongs';
import commits from './commits';

export default combineReducers({
  stations,
  currentStation,
  user,
  visitor,
  favouriteSongs,
  skipRule,
  commits,
});
