import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';

export default async (emitter, email) => {
  const isExistEmail = await userController.isExistUserHandler(email);

  emitter.emit(EVENTS.SERVER_CHECK_EMAIL_RESPONSE, {
    status: isExistEmail,
  });
};
