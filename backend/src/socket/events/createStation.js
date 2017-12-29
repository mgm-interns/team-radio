import * as stationController from '../../controllers/station';
import * as EVENTS from '../../const/actions';
import * as controller from '../../../fixture/station';

export default async (emitter, userId, stationName) => {
  const station = await controller.addStation(userId, stationName);
  try {
    // station = await stationController.addStation(stationName, userId);
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
      // const stations = await stationController.getAllAvailableStations();
      const stations = controller.stations;
      emitter.emitAll(EVENTS.SERVER_UPDATE_STATIONS, {
        stations: stations,
      });
    } catch (err) {
      console.error(err);
    }
  }
};
