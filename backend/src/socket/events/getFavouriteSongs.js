import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';

export default async (emitter, userId) => {
  const user = await userController.getUserById(userId);
  if (user) {
    try {
      _getFavouriteSongs(emitter, userId);
    } catch (err) {
      emitter.emit(EVENTS.SERVER_GET_FAVOURITE_SONG_FAILURE, {
        message: err.message,
      });
    }
  } else {
    emitter.emit(EVENTS.SERVER_GET_FAVOURITE_SONG_FAILURE, {
      message: 'You need to login to use this feature.',
    });
  }
};

// eslint-disable-next-line
const _getFavouriteSongs = async (emitter, userId) => {
  // eslint-disable-next-line
  const favouriteSongs =
    await userController.getFavouritedSongs(userId);
  if (favouriteSongs) {
    emitter.emit(EVENTS.SERVER_GET_FAVOURITE_SONG_SUCCESS, {
      songs: favouriteSongs,
    });
    // eslint-disable-next-line
    return;
  }
  emitter.emit(EVENTS.SERVER_GET_FAVOURITE_SONG_FAILURE, {
    message: "Can't get favourite songs of this user",
  });
};
