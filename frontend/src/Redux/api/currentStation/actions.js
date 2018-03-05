import {
  CLIENT_ADD_SONG,
  CLIENT_UPVOTE_SONG,
  CLIENT_JOIN_STATION,
  CLIENT_DOWNVOTE_SONG,
  CLIENT_LEAVE_STATION,
  CLIENT_REDIRECT_STATION,
} from 'Redux/actions';

const DEFAULT_USER_ID = '0';

// Client action creator
export const joinStation = ({ stationId, userId = DEFAULT_USER_ID }) => ({
  type: CLIENT_JOIN_STATION,
  payload: { userId, stationId: stationId.toString() },
});

export const redirectStation = ({ stationId, userId = DEFAULT_USER_ID }) => ({
  type: CLIENT_REDIRECT_STATION,
  payload: { userId, stationId: stationId.toString() },
});

export const leaveStation = ({ stationId, userId = DEFAULT_USER_ID }) => ({
  type: CLIENT_LEAVE_STATION,
  payload: { userId, stationId: stationId.toString() },
});

export const addSong = ({
  userId = DEFAULT_USER_ID,
  stationId,
  songUrl,
  title,
  thumbnail,
  creator,
  duration,
  songMessage,
  localstations,
  replay,
}) => ({
  type: CLIENT_ADD_SONG,
  payload: {
    userId,
    stationId: stationId.toString(),
    songUrl,
    title,
    thumbnail,
    creator,
    duration,
    songMessage,
    localstations,
    is_played: false,
    up_vote: [],
    down_vote: [],
    replay,
  },
});

export const upVoteSong = ({
  userId = DEFAULT_USER_ID,
  stationId,
  songId,
}) => ({
  type: CLIENT_UPVOTE_SONG,
  payload: { userId, stationId: stationId.toString(), songId },
});

export const downVoteSong = ({
  userId = DEFAULT_USER_ID,
  stationId,
  songId,
}) => ({
  type: CLIENT_DOWNVOTE_SONG,
  payload: { userId, stationId: stationId.toString(), songId },
});
