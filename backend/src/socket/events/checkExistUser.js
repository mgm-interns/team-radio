import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';
import createEmitter from '../managers/createEmitter';

export default async (io, socket, email) => {
  const emitter = createEmitter(socket, io);
  const isExistEmail = await userController.isExistUserHandler(email);
  emitter.emit(EVENTS.SERVER_CHECK_EMAIL_RESPONSE, {
    status: isExistEmail,
  });
};
