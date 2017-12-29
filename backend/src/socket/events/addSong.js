import * as stationController from '../../controllers/station';
import * as EVENTS from '../../const/actions';
import * as controller from '../../../fixture/station';

export default async (emitter, userId, stationId, songUrl) => {
  const playlist = await controller.addSong(stationId, songUrl, userId);

  emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_PLAYLIST, {
    playlist: playlist,
  });
};
