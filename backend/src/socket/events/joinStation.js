import * as EVENTS from '../../const/actions';
import * as controller from '../../../fixture/station';

export default async (emitter, userId, stationId) => {
  const station = controller.stations.find(st => st.id === stationId);
  try {
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
    const nowPlaying = await controller.getNowplaying(stationId);
    emitter.emit(EVENTS.SERVER_UPDATE_NOW_PLAYING, {
      nowPlaying: nowPlaying,
      // nowPlaying { index, songId, playingTime }
    });

    try {
      emitter.emitToStation(stationId, EVENTS.SERVER_NEW_USER_JOINED, {
        user: userId,
      });
    } catch (err) {
      console.error(err);
    }
  }
};
