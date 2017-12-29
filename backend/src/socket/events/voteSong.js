// TODO: WIP
import * as controller from '../../../fixture/station';

export default (emitter, score, userId, stationId, songId) => {
  // TODO
  if (score === 1) {
    _upVoteSong(emitter, userId, stationId, songId);
  } else if (score === -1) {
    _downVoteSong(emitter, userId, stationId, songId);
  } else console.log('Score unknow!');
};

const _upVoteSong = async (emitter, userId, stationId, songId) => {
  const playlist = await controller.upVoteSong(userId, stationId, songId);
};

const _downVoteSong = async (emitter, userId, stationId, songId) => {
  const playlist = await controller.downVoteSong(userId, stationId, songId);
};
