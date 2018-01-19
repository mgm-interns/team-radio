import HttpRequest from 'Util/redux/HttpRequest';

const ENDPOINT = process.env.REACT_APP_SERVER_END_POINT;

const getFavouriteSongsRequest = new HttpRequest({
  method: 'GET',
  type: 'FETCH_FAVOURITE_SONGS_BY_USER_ID',
  endpoint: `${ENDPOINT}/getFavouriteSongs`,
});

export const getFavouriteSongs = getFavouriteSongsRequest.getAction();
