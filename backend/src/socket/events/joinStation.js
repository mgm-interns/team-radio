import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';

import players from '../../players';

export default async (emitter, stationId, userId) => {
  let station;
  try {
    station = await stationController.getStation(stationId);
    emitter.emit(EVENTS.SERVER_JOINED_STATION_SUCCESS, {
      station: station,
    });
  } catch (err) {
    console.error(err);
    emitter.emit(EVENTS.SERVER_JOINED_STATION_FAILURE, {
      message: EVENTS.SERVER_JOINED_STATION_FAILURE,
    });
    throw err;
  }

  if (station) {
    let player = players.getPlayer(stationId);
    let nowPlaying = player.getNowPlaying();
    emitter.emit(EVENTS.SERVER_NOW_PLAYING, nowPlaying);

    try {
      let user = await userController.getUser(userId);
      emitter.emitToStation(stationId, EVENTS.SERVER_NEW_USER_JOINED, {
        user: user,
      });
    } catch (err) {
      console.error(err);
    }
  }
};
