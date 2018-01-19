import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';
import * as VOTE from '../index';
import skipDecider from '../managers/skipDecider';
import createEmitter from '../managers/createEmitter';

export default (action, io, socket, userId, stationId, songId) => {
  if (action === VOTE.UPVOTE_ACTION) {
    _upVoteSong(io, socket, userId, stationId, songId);
  } else if (action === VOTE.DOWNVOTE_ACTION) {
    _downVoteSong(io, socket, userId, stationId, songId);
  } else console.log('Vote Action Unknow!');
};

const _upVoteSong = async (io, socket, userId, stationId, songId) => {
  const emitter = createEmitter(socket, io);

  // Check if anonymous user try to vote song
  if (!_checkUserExist(userId)) {
    emitter.emit(EVENTS.SERVER_UPVOTE_SONG_FAILURE, {
      message: 'You need to login to use this feature!',
    });
    return;
  }

  try {
    // This statement will throw an Error if upVote not successful
    const playlist = await stationController.upVote(stationId, songId, userId);

    // Skip song decision when vote change
    skipDecider(io, stationId);

    // Emit result
    emitter.emit(EVENTS.SERVER_UPVOTE_SONG_SUCCESS, {});
    emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_PLAYLIST, {
      playlist: playlist,
    });
  } catch (err) {
    emitter.emit(EVENTS.SERVER_UPVOTE_SONG_FAILURE, {
      message: err.message,
    });
  }
};

const _downVoteSong = async (io, socket, userId, stationId, songId) => {
  const emitter = createEmitter(socket, io);

  // Check if anonymous user try to vote song
  if (!_checkUserExist(userId)) {
    emitter.emit(EVENTS.SERVER_DOWNVOTE_SONG_FAILURE, {
      message: 'You need to login to use this feature!',
    });
    return;
  }

  try {
    // eslint-disable-next-line
    const playlist =
      await stationController.downVote(stationId, songId, userId);

    // Skip song decision when vote change
    skipDecider(io, stationId);

    // Emit result
    emitter.emit(EVENTS.SERVER_DOWNVOTE_SONG_SUCCESS, {});
    emitter.emitToStation(stationId, EVENTS.SERVER_UPDATE_PLAYLIST, {
      playlist: playlist,
    });
  } catch (err) {
    emitter.emit(EVENTS.SERVER_DOWNVOTE_SONG_FAILURE, {
      message: err.message,
    });
  }
};

const _checkUserExist = async userId => {
  // Check if anonymous user try to vote song
  const user = await userController.getUserById(userId);
  if (user) return true;
  return false;
};
