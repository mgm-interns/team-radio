// server action types
export const SERVER_JOINED_STATION = 'SERVER:JOINED_STATION';
export const SERVER_UPDATE_STATION = 'SERVER:UPDATE_STATION';

// Server action creator

// Client action types
export const CLIENT_JOIN_STATION = 'CLIENT:JOIN_STATION';
export const CLIENT_UPVOTE_VIDEO = 'CLIENT:UPVOTE_VIDEO';
export const CLIENT_UN_UPVOTE_VIDEO = 'CLIENT:UN_UPVOTE_VIDEO';

// Client action creator
export const joinStation = station_name => ({
  type: CLIENT_JOIN_STATION,
  payload: { station_name },
});

export const upVoteVideo = ({ stationId, videoId }) => ({
  type: CLIENT_UPVOTE_VIDEO,
  payload: { stationId, videoId },
});

export const unUpVoteVideo = ({ stationId, videoId }) => ({
  type: CLIENT_UN_UPVOTE_VIDEO,
  payload: { stationId, videoId },
});

// Friday demo action
export const SET_CURRENT_STATION = 'SET_CURRENT_STATION';

export const setCurrentStation = station => ({
  type: SET_CURRENT_STATION,
  payload: { station },
});
