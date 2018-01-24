import {
  CLIENT_FAVOURITE_SONG,
  CLIENT_GET_FAVOURITE_SONG,
} from 'Redux/actions';

const DEFAULT_USER_ID = '0';

export const favouriteSongRequest = ({
  songId,
  userId = DEFAULT_USER_ID,
  songUrl,
  stationId = null,
}) => ({
  type: CLIENT_FAVOURITE_SONG,
  payload: { songId, userId, songUrl, stationId },
});

export const getFavouriteSongs = ({ userId }) => ({
  type: CLIENT_GET_FAVOURITE_SONG,
  payload: { userId },
});
