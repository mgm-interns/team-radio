/** *******************************************************
 *                                                        *
 *                                                        *
 *                      ADD SONG                          *
 *                      By Ryker                          *
 *                                                        *
 *                                                        *
 ******************************************************** */

import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';
import * as CONSTANTS from '../../const/constants';
import * as players from '../../players';

export default async (emitter, userId, stationId, songUrl) => {
  /**
   * Decline request if the user does not exist
   * Otherwise, allow to add song
   */
  const user = await userController.getUserById(userId);
  if (user) {
    _addSongProcess(emitter, userId, stationId, songUrl);
  } else {
    emitter.emit(EVENTS.SERVER_ADD_SONG_FAILURE, {
      message: CONSTANTS.MESSAGE_LOGIN_REQUIRED,
    });
  }
};

const _addSongProcess = async (emitter, userId, stationId, songUrl) => {
  let playlist;

  try {
    /**
     * addSong function will return playlist if add song success
     * If not, it will throw an error object with error message
     */
    playlist = await stationController.addSong(stationId, songUrl, userId);
    emitter.emit(EVENTS.SERVER_ADD_SONG_SUCCESS, {});
  } catch (err) {
    emitter.emit(EVENTS.SERVER_ADD_SONG_FAILURE, {
      message: err.message,
    });
    return;
  }

  /**
   * If add song success, then notify update playlist
   */
  try {
    const player = await players.getPlayer(stationId);
    const nowPlaying = await player.getNowPlaying();
    const history = stationController.getListSongHistory(
      stationId,
      CONSTANTS.HISTORY_LIMIT,
    );

    /**
     * If `nowPlaying.url` is `null`, player will update playlist and history
     * Otherwise playlist and history will be update here
     */
    if (nowPlaying.url) {
      emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_PLAYLIST, {
        playlist: playlist,
      });
      emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_HISTORY, {
        history: history,
      });
    }
  } catch (err) {
    console.log('Players error: ' + err);
  }
};
