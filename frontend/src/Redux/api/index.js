import { combineReducers } from 'redux';

import stations from './stations';
import playlist from './playlist';

export default combineReducers({
  stations,
  playlist,
});
