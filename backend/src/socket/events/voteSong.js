// TODO: WIP
export default (emitter, score, stationId, songId, userId) => {
  // TODO
  if (score === 1) {
    _upVoteSong(emitter, stationId, songId, userId);
  } else if (score === -1) {
    _downVoteSong(emitter, stationId, songId, userId);
  } else console.log('Score unknow!');
};

const _upVoteSong = (emitter, stationId, songId, userId) => {
    console.log('Up vote feature is coming soon!');
};

const _downVoteSong = (emitter, stationId, songId, userId) => {
    console.log('Down vote feature is coming soon!');
};
