import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';

export default async (emitter, songId, userId, stationId, songUrl) => {
  const user = await userController.getUserById(userId);
  if (user) {
    try {
      _addFavouriteSong(emitter, songId, userId, stationId, songUrl);
    } catch (err) {
      emitter.emit(EVENTS.SERVER_FAVOURITE_SONG_FAILURE, {
        message: err.message,
      });
    }
  } else {
    emitter.emit(EVENTS.SERVER_FAVOURITE_SONG_FAILURE, {
      message: 'You need to login to use this feature.',
    });
  }
};

// eslint-disable-next-line
const _addFavouriteSong = async (emitter, songId, userId, stationId, songUrl) => {
  // eslint-disable-next-line
  const status =
    await userController.addFavouriteSong(songId, userId, stationId, songUrl);

  if (status === userController.ADD_FAVOURITE_SUCCESS) {
    emitter.emit(EVENTS.SERVER_ADD_FAVOURITE_SONG_SUCCESS, {});
    return;
  }
  if (status === userController.UN_FAVOURITE_SUCCESS) {
    emitter.emit(EVENTS.SERVER_REMOVE_FAVOURITE_SONG_SUCCESS, {});
  }
};
