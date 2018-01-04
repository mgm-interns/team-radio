import * as stationController from '../../controllers/station';
import * as EVENTS from '../../const/actions';

export default async (emitter, userId, stationId, songUrl) => {
  let playlist;
  try {
    // Addsong and return playlist
    playlist = await stationController.addSong(stationId, songUrl, userId);
    emitter.emit(EVENTS.SERVER_ADD_SONG_SUCCESS, {
      message: 'Add song success!',
    });
    emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_PLAYLIST, {
      playlist: playlist,
    });
  } catch (err) {
    emitter.emit(EVENTS.SERVER_ADD_SONG_FAILURE, {
      message: err,
    });
  }
};
