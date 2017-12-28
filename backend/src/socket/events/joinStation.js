import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';
import * as players from '../../players';

export default async (emitter, userId, stationId) => {
  let station;
  try {
    station = await stationController.getStation(stationId);
    emitter.emit(EVENTS.SERVER_JOINED_STATION_SUCCESS, {
      station: station,
    });
  } catch (err) {
    console.error(err);
    emitter.emit(EVENTS.SERVER_JOINED_STATION_FAILURE, {
      message: err,
    });
    throw err;
  }

  if (station) {
    const player = await players.getPlayer(stationId);
    const nowPlaying = await player.getNowPlaying();
    emitter.emit(EVENTS.SERVER_UPDATE_NOW_PLAYING, {
      nowPlaying: nowPlaying,
    });

    try {
      const user = await userController.getUser(userId);
      emitter.emitToStation(stationId, EVENTS.SERVER_NEW_USER_JOINED, {
        user: user,
      });
    } catch (err) {
      console.error(err);
    }
  }
};