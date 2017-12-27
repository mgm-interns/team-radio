import * as stationController from '../../controllers/station';
import * as EVENTS from '../../const/actions';

export default async (emitter, stationName, userId) => {
  let station;
  try {
    station = await stationController.addStation(stationName, userId);
    emitter.emit(EVENTS.SERVER_CREATE_STATION_SUCCESS, {
      station: station,
    });
  } catch (err) {
    console.log(err);
    emitter.emit(EVENTS.SERVER_CREATE_STATION_FAILURE, {
      message: err,
    });
  }

  if (station) {
    try {
      let stations = await stationController.getAllAvailableStations();
      emitter.emitAll(EVENTS.SERVER_UPDATE_STATIONS, {
        stations: stations,
      });
    } catch (err) {
      console.error(err);
    }
  }
};
