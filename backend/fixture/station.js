export const stations = [];

export const addStation = async (userId, stationName) =>
  _doAddStation(userId, stationName);

export const getPlaylist = async stationId =>
  Promise.resolve(stations.find(st => st.id === stationId).playlist);

export const getNowplaying = async stationId =>
  Promise.resolve(stations.find(st => st.id === stationId).nowplaying);

export const nextNowplaying = async stationId => {
  const nowPlaying = stations.find(st => st.id === stationId).nowplaying;
  const playlist = stations.find(st => st.id === stationId).playlist;

  if (nowPlaying.index === playlist.length - 1) {
    nowPlaying.index = 0;
    const playingSong = playlist[nowPlaying.index];
    _applyNowPlaying(nowPlaying, playingSong);
  } else {
    nowPlaying.index += 1;
    const playingSong = playlist[nowPlaying.index];
    _applyNowPlaying(nowPlaying, playingSong);
  }
  return Promise.resolve(nowPlaying);
};

export const addSong = async (stationId, songUrl, userId) =>
  _doAddSong(stationId, songUrl, userId);

export const upVoteSong = async (userId, stationId, songId) => {
  const playlist = stations.find(st => st.id === stationId);
  playlist.map(song => {
    if (song.id === songId) {
      return {
        ...song,
        score: song.score + 1,
      };
    }
    return song;
  });
  return Promise.resolve(playlist);
};

export const downVoteSong = async (userId, stationId, songId) => {
  const playlist = stations.find(st => st.id === stationId);
  playlist.map(song => {
    if (song.id === songId) {
      return {
        ...song,
        score: song.score - 1,
      };
    }
    return song;
  });
  return Promise.resolve(playlist);
};

const _applyNowPlaying = (nowPlaying, playingSong) => {
  nowPlaying.songId = playingSong.songId;
  nowPlaying.songUrl = playingSong.songUrl;
  nowPlaying.startedTime = Date.now();
};

const _doAddStation = async (userId, stationName) => {
  const station = {
    id: stationName.toLowerCase().replace(/ /g, '-'),
    stationName: stationName,
    ownerId: userId,
    nowPlaying: {
      index: -1,
      songId: null,
      songUrl: null,
      startedTime: null,
    },
    playlist: [],
    createdDay: Date.now(),
  };
  stations.push(station);
  return Promise.resolve(station);
};

const _doAddSong = async (stationId, songUrl, userId) => {
  const playlist = stations.find(st => st.id === stationId).playlist;
  playlist.push({
    id: songUrl.substr(32, 11), // Get videoID from youtube link
    songUrl: songUrl,
    duration: 120000, // ms
    score: 0,
    creatorId: userId,
  });
  return Promise.resolve(playlist);
};
