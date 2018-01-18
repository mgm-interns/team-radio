import * as stationController from '../../controllers/station';
import * as players from '../../players';
import * as EVENTS from '../../const/actions';

export default async (emitter, userId, stationName, isPrivate) => {
  let station;

  // Create station and emit that station for user
  try {
    station = await stationController.addStation(
      stationName,
      userId,
      isPrivate,
    );
    emitter.emit(EVENTS.SERVER_CREATE_STATION_SUCCESS, {
      station: station,
    });
  } catch (err) {
    console.log('Create station failed: ' + err.message);
    emitter.emit(EVENTS.SERVER_CREATE_STATION_FAILURE, {
      message: err.message,
    });
    return;
  }

  //  If station is created, create player
  try {
    await players.getPlayer(station.station_id);
  } catch (err) {
    console.error('Players error: ' + err.message);
  }

  // If station is created, let all user of Team Radio update station list
  if (station.is_private === false) {
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
