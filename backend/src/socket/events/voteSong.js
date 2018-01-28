import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';
import * as CONSTANTS from '../../const/constants';
import skipDecider from '../managers/skipDecider';

export default (action, emitter, userId, stationId, songId) => {
  if (action === CONSTANTS.UPVOTE_ACTION) {
    _upVoteSong(emitter, userId, stationId, songId);
  }

  if (action === CONSTANTS.DOWNVOTE_ACTION) {
    _downVoteSong(emitter, userId, stationId, songId);
  }
};

const _upVoteSong = async (emitter, userId, stationId, songId) => {
  // Check if anonymous user try to vote song
  if (!_checkUserExist(userId)) {
    emitter.emit(EVENTS.SERVER_UPVOTE_SONG_FAILURE, {
      message: CONSTANTS.MESSAGE_LOGIN_REQUIRED,
    });
    return;
  }

  try {
    // This statement will throw an Error if upVote not successful
    const playlist = await stationController.upVote(stationId, songId, userId);

    // Skip song decision when vote change
    skipDecider(stationId);

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

const _downVoteSong = async (emitter, userId, stationId, songId) => {
  // Check if anonymous user try to vote song
  if (!_checkUserExist(userId)) {
    emitter.emit(EVENTS.SERVER_DOWNVOTE_SONG_FAILURE, {
      message: CONSTANTS.MESSAGE_LOGIN_REQUIRED,
    });
    return;
  }

  try {
    // This statement will throw an Error if downVote not successful
    // eslint-disable-next-line
    const playlist =
      await stationController.downVote(stationId, songId, userId);

    // Skip song decision when vote change
    skipDecider(stationId);

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
  const user = await userController.getUserById(userId);
  if (user) return true;
  return false;
};
