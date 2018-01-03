import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';

export default async (emitter, email) => {
  const isExist = await userController.isExistUserHandler(email);

  emitter.emit(EVENTS.SERVER_UPDATE_PLAYLIST, {
    isExist: isExist,
  });
};
