import {
  CLIENT_JOIN_STATION,
  CLIENT_CREATE_STATION,
  CLIENT_UPVOTE_VIDEO,
  CLIENT_UN_UPVOTE_VIDEO,
  CLIENT_ADD_LINK_VIDEO,
} from '../../../../lib/actions';

// Client action creator

export const createNewStation = ({ stationName, userId }) => ({
  type: CLIENT_CREATE_STATION,
  payload: { stationName, userId },
});

<<<<<<< HEAD
export const joinStation = ({ stationId, userId }) => ({
  type: CLIENT_JOIN_STATION,
  payload: { stationId, userId },
});

export const addLinkVideo = ({ stationId, videoUrl, userId }) => ({
  type: CLIENT_ADD_LINK_VIDEO,
  payload: { stationId, videoUrl, userId },
=======
// Client action creator
export const joinStation = station_name => ({
  type: CLIENT_JOIN_STATION,
  payload: { station_name },
>>>>>>> dev
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
