import * as stationController from '../../controllers/station';
import * as EVENTS from '../../const/actions';

export default (emitter, score, userId, stationId, songId) => {
  // TODO
  if (score === 1) {
    _upVoteSong(emitter, userId, stationId, songId);
  } else if (score === -1) {
    _downVoteSong(emitter, userId, stationId, songId);
  } else console.log('Score unknow!');
};

const _upVoteSong = async (emitter, userId, stationId, songId) => {
  try {
    const playlist = await stationController.addStation(userId, stationId, songId);
    emitter.emit(EVENTS.SERVER_CREATE_STATION_SUCCESS, {
      playlist: playlist,
    });
} catch (err) {
    console.log(err);
    emitter.emit(EVENTS.SERVER_CREATE_STATION_FAILURE, {
      message: err,
    });
  }
};

const _downVoteSong = (emitter, userId, stationId, songId) => {
  console.log('Down vote feature is coming soon!');
};
