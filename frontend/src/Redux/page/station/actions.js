export const SET_PREVIEW_VIDEO = 'SET_PREVIEW_VIDEO';
export const MUTE_VIDEO_REQUEST = 'MUTE_VIDEO_REQUEST';
export const REPLAY_REQUEST = 'REPLAY_REQUEST';
export const PASSIVE_USER_REQUEST = 'PASSIVE_USER_REQUEST';
export const GET_NOW_PLAYING = 'GET_NOW_PLAYING';

export const setPreviewVideo = (value = null) => ({
  type: SET_PREVIEW_VIDEO,
  payload: value,
});

export const muteVideoRequest = ({
  muteNowPlaying = false,
  mutePreview = true,
  userDid = false,
}) => ({
  type: MUTE_VIDEO_REQUEST,
  payload: {
    muteNowPlaying,
    mutePreview,
    userDid,
  },
});

export const replayRequest = () => ({
  type: REPLAY_REQUEST,
});

export const passiveUserRequest = (passive = false) => ({
  type: PASSIVE_USER_REQUEST,
  payload: passive,
});

export const getNowPlaying = nowPlaying => ({
  type: GET_NOW_PLAYING,
  payload: nowPlaying,
});
