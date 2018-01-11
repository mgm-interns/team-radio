export const SET_PREVIEW_VIDEO = 'SET_PREVIEW_VIDEO';
export const MUTE_NOW_PLAYING = 'MUTE_NOW_PLAYING';
export const MUTE_PREVIEW = 'MUTE_PREVIEW';
export const SAVE_HISTORY = 'SAVE_HISTORY';
export const SAVE_PLAYLIST = 'SAVE_PLAYLIST';
export const REPLAY_REQUEST = 'REPLAY_REQUEST';

export const setPreviewVideo = (value = null) => ({
  type: SET_PREVIEW_VIDEO,
  payload: value,
});

export const muteNowPlaying = (muted = false) => ({
  type: MUTE_NOW_PLAYING,
  payload: muted,
});

export const mutePreview = (muted = true) => ({
  type: MUTE_PREVIEW,
  payload: muted,
});

export const savePlaylist = (playlist = []) => ({
  type: SAVE_PLAYLIST,
  payload: playlist,
});

export const saveHistory = (history = []) => ({
  type: SAVE_HISTORY,
  payload: history,
});

export const replayRequest = () => ({
  type: REPLAY_REQUEST,
});
