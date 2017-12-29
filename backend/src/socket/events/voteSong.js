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
  console.log('Up vote feature is coming soon!');
};

const _downVoteSong = (emitter, userId, stationId, songId) => {
  console.log('Down vote feature is coming soon!');
};
