import {
  CLIENT_ADD_SONG,
  CLIENT_UPVOTE_SONG,
  CLIENT_JOIN_STATION,
  CLIENT_DOWNVOTE_SONG,
  CLIENT_LEAVE_STATION,
} from 'Redux/actions';

const DEFAULT_STATION_ID = 'default_station';

// Client action creator
export const joinStation = (stationId = DEFAULT_STATION_ID) => ({
  type: CLIENT_JOIN_STATION,
  payload: { userId: 0, stationId },
});

export const leaveStation = (stationId = DEFAULT_STATION_ID) => ({
  type: CLIENT_LEAVE_STATION,
  payload: { userId: 0, stationId },
});

export const addSong = ({ userId, stationId, songUrl, title, thumbnail }) => ({
  type: CLIENT_ADD_SONG,
  payload: {
    userId,
    stationId,
    songUrl,
    title,
    thumbnail,
    is_played: false,
    up_vote: [],
    down_vote: [],
  },
});

export const upVoteSong = ({ userId, stationId, songId }) => ({
  type: CLIENT_UPVOTE_SONG,
  payload: { userId, stationId, songId },
});

export const downVoteSong = ({ userId, stationId, songId }) => ({
  type: CLIENT_DOWNVOTE_SONG,
  payload: { userId, stationId, songId },
});
