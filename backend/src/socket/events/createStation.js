import * as stationController from '../../controllers/station';
import * as players from '../../players';
import * as EVENTS from '../../const/actions';

export default async (emitter, userId, stationName) => {
  let station;

  // Create station and emit that station for user
  try {
    station = await stationController.addStation(stationName, userId);
    emitter.emit(EVENTS.SERVER_CREATE_STATION_SUCCESS, {
      station: station,
    });
  } catch (err) {
    console.log('Create station failed: ' + err.message);
    emitter.emit(EVENTS.SERVER_CREATE_STATION_FAILURE, {
      message: err.message,
    });
  }

  //  If station is created, create player
  if (station) {
    try {
      const player = await players.getPlayer(station.id);
    } catch (err) {
      console.error('Players error: ' + err.message);
    }
  }

  // If station is created, let all user of Team Radio update station list
  if (station) {
    try {
      const stations = await stationController.getAllAvailableStations();
      emitter.emitAll(EVENTS.SERVER_UPDATE_STATIONS, {
        stations: stations,
      });
    } catch (err) {
      console.error('Station controller error: ' + err.message);
    }
  }
};
