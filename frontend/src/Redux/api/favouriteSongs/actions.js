import {
  CLIENT_FAVOURITE_SONG,
  CLIENT_GET_FAVOURITE_SONG,
} from 'Redux/actions';

const DEFAULT_USER_ID = '0';

export const favouriteSongRequest = ({
  songId,
  userId = DEFAULT_USER_ID,
  stationId,
  songUrl,
}) => ({
  type: CLIENT_FAVOURITE_SONG,
  payload: { songId, userId, stationId, songUrl },
});

export const getFavouriteSongs = ({ userId }) => ({
  type: CLIENT_GET_FAVOURITE_SONG,
  payload: { userId },
});
