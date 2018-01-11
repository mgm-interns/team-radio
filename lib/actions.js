// SERVER RESPONSES
export const SERVER_JOINED_STATION_SUCCESS = 'SERVER:JOINED_STATION_SUCCESS';
// response payload: { station }

export const SERVER_JOINED_STATION_FAILURE = 'SERVER:JOINED_STATION_FAILURE';
// response payload: { message }
// message is error msg

export const SERVER_LEAVE_STATION_SUCCESS = 'SERVER:LEAVE_STATION_SUCCESS';
// request payload { }

export const SERVER_LEAVE_STATION_FAILURE = 'SERVER:LEAVE_STATION_FAILURE';
// request payload { message }

export const SERVER_CREATE_STATION_SUCCESS = 'SERVER:CREATE_STATION_SUCCESS';
// response payload: { station }

export const SERVER_CREATE_STATION_FAILURE = 'SERVER:CREATE_STATION_FAILURE ';
// response payload: { message }
// message is error msg: (Ex: 'Station name is already exists!')

export const SERVER_ADD_SONG_SUCCESS = 'SERVER:ADD_SONG_SUCCESS';
// response payload: { message }

export const SERVER_ADD_SONG_FAILURE = 'SERVER:ADD_SONG_FAILURE';
// response payload: { message }
// message is error msg: (Ex: 'The song url is not available!')

export const SERVER_CHECK_EMAIL_RESPONSE = 'SERVER:CHECK_EMAIL_RESPONSE';
// response payload: { status }
// status = 'true' if email is already exists

export const SERVER_UPVOTE_SONG_SUCCESS = 'SERVER:UPVOTE_SONG_SUCCESS';
// response payload: { }

export const SERVER_UPVOTE_SONG_FAILURE = 'SERVER:UPVOTE_SONG_FAILURE';
// response payload: { message }

export const SERVER_DOWNVOTE_SONG_SUCCESS = 'SERVER:DOWNVOTE_SONG_SUCCESS';
// response payload: { }

export const SERVER_DOWNVOTE_SONG_FAILURE = 'SERVER:DOWNVOTE_SONG_FAILURE';
// response payload: { message }

/* ***************************************************************************** */
// SERVER NOTIFY
export const SERVER_UPDATE_STATIONS = 'SERVER:UPDATE_STATIONS';
// response payload: { stations }
// stations is list of all station

export const SERVER_UPDATE_PLAYLIST = 'SERVER:UPDATE_PLAYLIST';
// response payload: { playlist }
// execute when the playlist is changed (upvote/downvote, addsong,...)

export const SERVER_UPDATE_HISTORY = 'SERVER:UPDATE_HISTORY';
// response payload: { history }
// execute when the history is changed

export const SERVER_UPDATE_NOW_PLAYING = 'SERVER:UPDATE_NOW_PLAYING';
// response payload: { nowPlaying }
// execute when a new song is played

export const SERVER_NEW_USER_JOINED = 'SERVER:NEW_USER_JOINED';
// response payload: { user }
// execute when someone joins station

export const SERVER_USER_LEFT = 'SERVER:USER_LEFT';
// response payload: { user }
// execute when someone leaves station

export const SERVER_UPDATE_ONLINE_USERS = 'SERVER:UPDATE_ONLINE_USERS';
// response payload: { online_count }
// When number of online user change

export const SERVER_STATION_CHANGE_ONLINE_USERS =
  'SERVER:STATION_CHANGE_ONLINE_USERS';
// response payload: { stationId, online_count }
// When number of online user change on a station

export const SERVER_CHANGE_STATION_THUMBNAIL =
  'SERVER:CHANGE_STATION_THUMBNAIL';
// response payload: { stationId, thumbnailUrl }
// When a station change playing

export const SERVER_SKIP_SONG = 'SERVER:SKIP_SONG';
// response payload: { message }
// execute when a song is skipped

/* ***************************************************************************** */
// CLIENT REQUESTS
export const CLIENT_CREATE_STATION = 'CLIENT:CREATE_STATION_REQUEST';
// request payload { userId, stationName, isPrivate }

export const CLIENT_JOIN_STATION = 'CLIENT:JOIN_STATION_REQUEST';
// request payload { userId, stationId }

export const CLIENT_LEAVE_STATION = 'CLIENT:LEAVE_STATION_REQUEST';
// request payload { userId, stationId }

export const CLIENT_ADD_SONG = 'CLIENT:ADD_SONG_REQUEST';
// request payload { userId, stationId, songUrl }

export const CLIENT_ADD_MULTI_SONG = 'CLIENT:ADD_MULTI_SONG_REQUEST';
// request payload { userId, stationId, songList[] }

export const CLIENT_UPVOTE_SONG = 'CLIENT:UPVOTE_SONG_REQUEST';
// request payload { useId, stationId, songId }

export const CLIENT_DOWNVOTE_SONG = 'CLIENT:DOWNVOTE_SONG_REQUEST';
// request payload { useId, stationId, songId }

export const CLIENT_SKIP_SONG = 'CLIENT:SKIP_SONG_REQUEST';
// request payload { useId, stationId, songId }

export const CLIENT_CHECK_EXISTS_EMAIL = 'CLIENT:CHECK_EXISTS_EMAIL_REQUEST';
// request payload { email }
