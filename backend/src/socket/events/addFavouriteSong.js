/** *******************************************************
 *                                                        *
 *                                                        *
 *                   ADD FAVOURITE SONG                   *
 *                        By Ryker                        *
 *                                                        *
 *                                                        *
 ******************************************************** */

import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';
import * as CONSTANTS from '../../const/constants';

export default async (emitter, songId, userId, songUrl, stationId) => {
  /**
   * Decline request if the user does not exist
   * Otherwise, allow to add favourite song
   */
  const user = await userController.getUserById(userId);
  if (user) {
    try {
      _addFavouriteSong(emitter, songId, userId, songUrl, stationId);
    } catch (err) {
      emitter.emit(EVENTS.SERVER_FAVOURITE_SONG_FAILURE, {
        message: err.message,
      });
    }
  } else {
    emitter.emit(EVENTS.SERVER_FAVOURITE_SONG_FAILURE, {
      message: CONSTANTS.MESSAGE_LOGIN_REQUIRED,
    });
  }
};

/**
 * Mark a song as favourite
 * Remove from favourite if the song is already in favourite list
 * @param {Object} emitter Use for dispatch events
 * @param {String} songId ID of the song you want to mark as favourite
 * @param {String} userId ID of the user who request to mark favourite song
 * @param {String} stationId ID of the station which song is in
 * @param {String} songUrl Url of the song you want to mark as favourite
 */
// eslint-disable-next-line
const _addFavouriteSong = async (emitter, songId, userId, songUrl, stationId) => {
  let song = {};

  // eslint-disable-next-line
  const status =
    await userController.addFavouriteSong(songId, userId, songUrl, stationId);

  const list = await userController.getFavouritedSongs(userId);
  if (status === userController.ADD_FAVOURITE_SUCCESS) {
    /* eslint-disable consistent-return */
    list.forEach(item => {
      if (item.song_id === songId) {
        song = item;
        return false;
      }
    });
    emitter.emit(EVENTS.SERVER_ADD_FAVOURITE_SONG_SUCCESS, {
      song,
    });
    return;
  }
  if (
    status === userController.UN_FAVOURITE_SUCCESS ||
    status === userController.UN_FAVOURITE_SUCCESS_PROFILE
  ) {
    emitter.emit(EVENTS.SERVER_REMOVE_FAVOURITE_SONG_SUCCESS, {
      url: songUrl,
    });
  }
};
