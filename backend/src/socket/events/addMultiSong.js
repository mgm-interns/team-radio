import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';
import * as players from '../../players';

export default async (emitter, userId, stationId, songList) => {
  let playlist;
  try {
    await userController.getUserById(userId);
    // Addsong and return playlist
    playlist = await stationController.addMultiSong(
      stationId,
      songList,
      userId,
    );
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
