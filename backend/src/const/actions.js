// SERVER RESPONSES
export const SERVER_JOINED_STATION_SUCCESS = 'SERVER:JOINED_STATION_SUCCESS';
// response payload: { station }

export const SERVER_JOINED_STATION_FAILURE = 'SERVER:JOINED_STATION_FAILURE';
// response payload: { message }
// message is error msg

export const SERVER_CREATE_STATION_SUCCESS = 'SERVER:CREATE_STATION_SUCCESS';
// response payload: { station }

export const SERVER_CREATE_STATION_FAILURE = 'SERVER:CREATE_STATION_FAILURE ';
// response payload: { message } 
// message is error msg: (Ex: 'Station name is already exists!')



/*******************************************************************************/
// SERVER NOTIFY
export const SERVER_UPDATE_STATIONS = 'SERVER:UPDATE_STATIONS';
// response payload: { stations }
// stations is list of all station
// excute when the playlist is changed (upvote/downvote, addsong,...)

export const SERVER_UPDATE_PLAYLIST = 'SERVER:UPDATE_PLAYLIST';
// response payload: { playlist }
// excute when a new station is created,...

export const SERVER_UPDATE_NOW_PLAYING = 'SERVER:UPDATE_NOW_PLAYING';
// response payload: { nowPlaying }
// excute when a new song is played

export const SERVER_NEW_USER_JOINED = 'SERVER:NEW_USER_JOINED';
// response payload: { user }
// excute when someone joins station

export const SERVER_USER_LEFT = 'SERVER:USER_LEFT';
// response payload: { user }
// excute when someone leaves station



/*******************************************************************************/
// CLIENT REQUESTS
export const CLIENT_JOIN_STATION = 'CLIENT:JOIN_STATION_REQUEST';
// request payload { userId, stationId }

export const CLIENT_LEAVE_STATION = 'CLIENT:LEAVE_STATION_REQUEST';
// request payload { userId, stationId }

export const CLIENT_CREATE_STATION = 'CLIENT:CREATE_STATION_REQUEST';
// request payload { userId, stationName }

export const CLIENT_UPVOTE_SONG = 'CLIENT:UPVOTE_SONG_REQUEST';
// request payload { useId, stationId, songId }

export const CLIENT_DOWNVOTE_SONG = 'CLIENT:DOWNVOTE_SONG_REQUEST';
// request payload { useId, stationId, songId }

export const CLIENT_ADD_SONG = 'CLIENT:CLIENT_ADD_SONG_REQUEST';
// request payload { userId, stationId, songUrl }
