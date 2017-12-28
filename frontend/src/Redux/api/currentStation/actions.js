import {
  CLIENT_UPVOTE_SONG,
  CLIENT_JOIN_STATION,
  CLIENT_DOWNVOTE_SONG,
  SERVER_JOINED_STATION_SUCCESS,
  SERVER_JOINED_STATION_FAILURE,
} from 'Redux/actions';

// Client action creator
export const joinStation = station_name => ({
  type: CLIENT_JOIN_STATION,
  payload: { station_name },
});

export const upVoteSong = ({ stationId, videoId }) => ({
  type: CLIENT_UPVOTE_SONG,
  payload: { stationId, videoId },
});

export const downVoteSong = ({ stationId, videoId }) => ({
  type: CLIENT_DOWNVOTE_SONG,
  payload: { stationId, videoId },
});
