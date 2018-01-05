import * as stationController from '../../controllers/station';
import * as EVENTS from '../../const/actions';
import * as players from "../../players";

export default async (emitter, userId, stationId, songUrl) => {
  let playlist;
  try {
    const player = await players.getPlayer(stationId);
    const nowPlaying = await player.getNowPlaying();
    // Addsong and return playlist
    playlist = await stationController.addSong(stationId, songUrl, userId);
    emitter.emit(EVENTS.SERVER_ADD_SONG_SUCCESS, {
      message: 'Add song success!',
    });
    if (nowPlaying.url) {
      emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_PLAYLIST, {
        playlist: playlist,
      });
    }
  } catch (err) {
    emitter.emit(EVENTS.SERVER_ADD_SONG_FAILURE, {
      message: err.message,
    });
  }
};
