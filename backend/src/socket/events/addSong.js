import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';
import * as players from '../../players';

export default async (emitter, userId, stationId, songUrl) => {
  const user = await userController.getUserById(userId);
  if (user) {
    _addSongProcess(emitter, userId, stationId, songUrl);
  } else {
    _addSongProcess(emitter, null, stationId, songUrl);
  }
};

const _addSongProcess = async (emitter, userId, stationId, songUrl) => {
  let playlist;

  try {
    playlist = await stationController.addSong(stationId, songUrl, userId);
    emitter.emit(EVENTS.SERVER_ADD_SONG_SUCCESS, {});
  } catch (err) {
    emitter.emit(EVENTS.SERVER_ADD_SONG_FAILURE, {
      message: err.message,
    });
  }

  // If add success, notify update playlist
  if (playlist) {
    try {
      const player = await players.getPlayer(stationId);
      const nowPlaying = await player.getNowPlaying();
      if (nowPlaying.url) {
        emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_PLAYLIST, {
          playlist: playlist,
        });
      }
    } catch (err) {
      console.log('Players error: ' + err);
    }
  }
};
