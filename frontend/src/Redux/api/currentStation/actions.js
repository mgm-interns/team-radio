// server action types
export const SERVER_JOINED_STATION = 'SERVER:JOINED_STATION';
export const SERVER_UPDATE_STATION = 'SERVER:UPDATE_STATION';
export const SERVER_UPDATE_PLAYLIST = 'SERVER:UPDATE_PLAYLIST';
export const SERVER_UPDATE_NOW_PLAYING = 'SERVER:UPDATE_NOW_PLAYING';
export const SERVER_NEW_USER_JOINED = 'SERVER:NEW_USER_JOINED';
export const SERVER_CREATE_STATION_SUCESS = 'SERVER:CREATE_STATION_SUCESS';

// Server action creator

// Client action types
export const CLIENT_JOIN_STATION = 'CLIENT:JOIN_STATION';
export const CLIENT_CREATE_STATION = 'CLIENT:CREATE_STATION';
export const CLIENT_UPVOTE_VIDEO = 'CLIENT:UPVOTE_VIDEO';
export const CLIENT_UN_UPVOTE_VIDEO = 'CLIENT:UN_UPVOTE_VIDEO';
export const CLIENT_ADD_LINK_VIDEO = 'CLIENT:ADD_LINK_VIDEO';

// Client action creator

export const createNewStation = ({ stationName, userId }) => ({
  type: CLIENT_CREATE_STATION,
  payload: { stationName, userId },
});

export const joinStation = ({ stationId, userId }) => ({
  type: CLIENT_JOIN_STATION,
  payload: { stationId, userId },
});

export const addLinkVideo = ({ stationId, videoUrl, userId }) => ({
  type: CLIENT_ADD_LINK_VIDEO,
  payload: { stationId, videoUrl, userId },
});

export const upVoteVideo = ({ stationId, videoId, userId }) => ({
  type: CLIENT_UPVOTE_VIDEO,
  payload: { stationId, videoId, userId },
});

export const unUpVoteVideo = ({ stationId, videoId, userId }) => ({
  type: CLIENT_UN_UPVOTE_VIDEO,
  payload: { stationId, videoId, userId },
});

// Friday demo action
export const SET_CURRENT_STATION = 'SET_CURRENT_STATION';

export const setCurrentStation = station => ({
  type: SET_CURRENT_STATION,
  payload: { station },
});
