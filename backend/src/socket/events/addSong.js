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

export default async (
  emitter,
  userId,
  stationId,
  songUrl,
  title,
  thumbnail,
  duration,
  songMessage,
  localstations,
) => {
  /**
   * Decline request if the user does not exist
   * Otherwise, allow to add song
   */
  let user = await userController.getUserById(userId);
  let creatorId = user ? userId : -1;
    _addSongProcess(
      emitter,
      creatorId,
      stationId,
      songUrl,
      title,
      thumbnail,
      duration,
      songMessage,
      localstations,
    );

};

const _addSongProcess = async (
  emitter,
  userId,
  stationId,
  songUrl,
  title,
  thumbnail,
  duration,
  songMessage,
  localstations,
) => {
    const localStationsArray = localstations ? JSON.parse(localstations) : [];
    let isMyStation = false;
    for (let stationName of localStationsArray) {
        if(stationName === stationId) {
            isMyStation = true;
            break;
        }
    }
    if (!isMyStation) {
        emitter.emit(EVENTS.SERVER_ADD_SONG_FAILURE, {
            message: "Cannot add song to anonymous station that was not created by you",
        });
        return;
    }
  let playlist;

  try {
    /**
     * addSong function will return playlist if add song success
     * If not, it will throw an error object with error message
     */
    playlist = await stationController.addSong(
      stationId,
      songUrl,
      userId,
      title,
      thumbnail,
      duration,
      songMessage,
      localstations,
    );
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

    /**
     * If `nowPlaying.url` is `null`, player will update playlist and history
     * Otherwise playlist and history will be update here
     */
    if (nowPlaying.url) {
      emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_PLAYLIST, {
        playlist: playlist,
      });
    }
  } catch (err) {
    console.log('Players error: ' + err);
  }
};
