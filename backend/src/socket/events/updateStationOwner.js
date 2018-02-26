import * as stationController from '../../controllers/station';
import * as EVENTS from '../../const/actions';

export default async (emitter, userId, stationName) => {
  let station;

  try {
    station = await stationController.updateStationOwner(
      stationName,
      userId
    );

    emitter.emit(EVENTS.SERVER_UPDATE_STATION_OWNER_SUCCESS, {
      station: station
    });
  } catch (err) {
    emitter.emit(EVENTS.SERVER_UPDATE_STATION_OWNER_FAILURE, {
      message: err.message
    });
    return;
  }
};