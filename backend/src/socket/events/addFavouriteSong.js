import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';
import * as players from '../../players';

export default async (emitter, songId, userId, stationId, songUrl) => {
  const user = await userController.getUserById(userId);
  if (user) {
    _addFavouriteSong(emitter, userId, stationId, songUrl);
  } else {
    emitter.emit(EVENTS.SERVER_ADD_SONG_FAILURE, {
      message: 'You need to login to use this feature.',
    });
  }
};
const _addFavouriteSong = (emitter, userId, stationId, songUrl) => {
  // TODO :
};
