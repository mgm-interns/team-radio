/** *******************************************************
 *                                                        *
 *                                                        *
 *                     CREATE STATION                     *
 *                        By Ryker                        *
 *                                                        *
 *                                                        *
 ******************************************************** */

import * as stationController from '../../controllers/station';
import * as switcher from '../../switcher';
import * as players from '../../players';
import * as EVENTS from '../../const/actions';
import config from '../../config/index';

export default async (emitter, userId, stationName, isPrivate, moduleEmitter) => {
  let station;

  try {
    /**
     * addStation function will return that station if create success
     * If not, it will throw an Error object with error message
     */
    station = await stationController.addStation(
      stationName,
      userId,
      isPrivate,
    );
    emitter.emit(EVENTS.SERVER_CREATE_STATION_SUCCESS, {
      station: station,
    });
    moduleEmitter.emit(config.events.STATION_WAS_CREATED, userId, config.action.ACTION_DEFINITIONS.CREATE_STATION);
  } catch (err) {
    emitter.emit(EVENTS.SERVER_CREATE_STATION_FAILURE, {
      message: err.message,
    });
    return;
  }

  //  If station is created, create player for that station
  try {
    await players.getPlayer(station.station_id);
  } catch (err) {
    console.error('Players error: ' + err.message);
  }

  // If station is created, let all user of Team Radio update station list
  if (station.is_private === false) {
    const stations = switcher.getPopularStations();
    emitter.emitAll(EVENTS.SERVER_UPDATE_STATIONS, {
      stations: stations,
    });
  }
};
