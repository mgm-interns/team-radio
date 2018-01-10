import * as stationController from '../../controllers/station';
import * as userController from '../../controllers/user';
import * as EVENTS from '../../const/actions';

export default (emitter, action, userId, stationId, songId) => {
  if (action === 1) {
    _upVoteSong(emitter, userId, stationId, songId);
  } else if (action === -1) {
    _downVoteSong(emitter, userId, stationId, songId);
  } else console.log('Action Unknow!');
};

const _upVoteSong = async (emitter, userId, stationId, songId) => {
  if (userId === '0') {
    emitter.emit(EVENTS.SERVER_UPVOTE_SONG_FAILURE, {
      message: 'Anonymous users can not vote song',
    });
    return;
  }

  try {
    // Check if userId is exist, allow vote song
    // If not, throw an error and emit message to user
    const user = await userController.getUserById(userId);
    const playlist = await stationController.upVote(stationId, songId, userId);
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
  if (userId === '0') {
    emitter.emit(EVENTS.SERVER_DOWNVOTE_SONG_FAILURE, {
      message: 'Anonymous users can not vote song',
    });
    return;
  }

  try {
    // Check if userId is exist, allow vote song
    // If not, throw an error and emit message to user
    const user = await userController.getUserById(userId);
    const playlist = await stationController.downVote(
      stationId,
      songId,
      userId,
    );
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
