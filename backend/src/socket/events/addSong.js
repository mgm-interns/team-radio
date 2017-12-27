import * as stationController from '../../controllers/station';
import * as EVENTS from '../../const/actions';

export default async (emitter, stationId, songUrl, userId) => {
  let playlist = await stationController.addSong(stationId, songUrl, userId);

  emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_PLAYLIST, {
    playlist: playlist,
  });
};
