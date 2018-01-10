import createEmitter from '../managers/createEmitter';
import * as players from '../../players';
import * as EVENTS from '../../const/actions';

export default (io, socket, userId, songId, stationId) => {
  const emitter = createEmitter(socket, io);

  /**
   * Check if song can be skip, run _skipSong(stationId, songId)
   */

  emitter.emit(EVENTS.SERVER_SKIP_SONG_FAILURE, {
    message: 'Skip song feature is coming soon!',
  });
};

const _skipSong = async (stationId, songId) => {
  const player = await players.getPlayer(stationId);
  player.skipNowPlayingSong(songId);
};
