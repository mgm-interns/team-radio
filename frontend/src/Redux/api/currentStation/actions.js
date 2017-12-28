import {
  CLIENT_ADD_SONG,
  CLIENT_UPVOTE_SONG,
  CLIENT_JOIN_STATION,
  CLIENT_DOWNVOTE_SONG,
  CLIENT_LEAVE_STATION,
} from 'Redux/actions';

// Client action creator
export const joinStation = stationId => ({
  type: CLIENT_JOIN_STATION,
  payload: { userId: 0, stationId },
});

export const leaveStation = stationId => ({
  type: CLIENT_LEAVE_STATION,
  payload: { userId: 0, stationId },
});

export const addSong = ({ stationId, songUrl }) => ({
  type: CLIENT_ADD_SONG,
  payload: { userId: 0, stationId, songUrl },
});

export const upVoteSong = ({ stationId, songId }) => ({
  type: CLIENT_UPVOTE_SONG,
  payload: { useId: 0, stationId, songId },
});

export const downVoteSong = ({ stationId, songId }) => ({
  type: CLIENT_DOWNVOTE_SONG,
  payload: { useId: 0, stationId, songId },
});
