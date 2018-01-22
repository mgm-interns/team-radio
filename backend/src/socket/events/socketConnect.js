/** *******************************************************
 *                                                        *
 *                                                        *
 *                     SOCKET CONNECT                     *
 *                        By Ryker                        *
 *                                                        *
 *                                                        *
 ******************************************************** */

import createEmitter from '../managers/createEmitter';
import * as EVENTS from '../../const/actions';
import * as switcher from '../../switcher';

export default (io, socket) => {
  updateStationList(io, socket);
};

const updateStationList = async (io, socket) => {
  const emitter = createEmitter(socket, io);
  emitter.emit(EVENTS.SERVER_UPDATE_STATIONS, {
    stations: switcher.getPopularStations(),
  });
};
