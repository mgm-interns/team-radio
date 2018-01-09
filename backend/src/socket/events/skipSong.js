import createEmitter from '../managers/createEmitter';
import * as EVENTS from '../../const/actions';

export default (io, socket, userId, songId, stationId) => {
  const emitter = createEmitter(socket, io);
  emitter.emit(EVENTS.SERVER_SKIP_SONG_FAILURE, {
    message: 'Skip song feature is coming soon!',
  });
};
