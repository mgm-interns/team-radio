/* ***************************************************************************** */
// CLIENT REQUESTS
export const CLIENT_ADD_SONG = 'CLIENT:ADD_SONG_REQUEST';
// request payload { userId, stationId, songUrl }

export const CLIENT_ADD_MULTI_SONG = 'CLIENT:ADD_MULTI_SONG_REQUEST';
// request payload { userId, stationId, songList[] }

export const CLIENT_UPVOTE_SONG = 'CLIENT:UPVOTE_SONG_REQUEST';
// request payload { useId, stationId, songId }

export const CLIENT_DOWNVOTE_SONG = 'CLIENT:DOWNVOTE_SONG_REQUEST';
// request payload { useId, stationId, songId }

/* ***************************************************************************** */
// SERVER RESPONSES
export const SERVER_ADD_SONG_SUCCESS = 'SERVER:ADD_SONG_SUCCESS';
// response payload: { }

export const SERVER_ADD_SONG_FAILURE = 'SERVER:ADD_SONG_FAILURE';
// response payload: { message }
// message is error msg: (Ex: 'The song url is not available!')

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
export const SERVER_UPDATE_PLAYLIST = 'SERVER:UPDATE_PLAYLIST';
// response payload: { playlist }
// execute when the playlist is changed (upvote/downvote, addsong,...)

export const SERVER_UPDATE_HISTORY = 'SERVER:UPDATE_HISTORY';
// response payload: { history }
// execute when the history is changed

export const SERVER_UPDATE_NOW_PLAYING = 'SERVER:UPDATE_NOW_PLAYING';
// response payload: { nowPlaying }
// execute when a new song is played

export const SERVER_SKIP_SONG = 'SERVER:SKIP_SONG';
// response payload: { message }
// execute when a song is skipped

export const SERVER_UPDATE_SKIPPED_SONGS = 'SERVER:UPDATE_SKIPPED_SONGS';
// response payload: [array of song ids]
// execute when the skipped songs is changed
