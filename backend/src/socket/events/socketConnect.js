/** *******************************************************
 *                                                        *
 *                                                        *
 *                     SOCKET CONNECT                     *
 *                        By Ryker                        *
 *                                                        *
 *                                                        *
 ******************************************************** */

import * as EVENTS from '../../const/actions';
import * as switcher from '../../switcher';

export default emitter => {
  updateStationList(emitter);
};

const updateStationList = emitter => {
  emitter.emit(EVENTS.SERVER_UPDATE_STATIONS, {
    stations: switcher.getPopularStations(),
  });
};
