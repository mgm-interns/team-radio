export const SET_PREVIEW_VIDEO = 'SET_PREVIEW_VIDEO';
export const MUTE_NOW_PLAYING = 'MUTE_NOW_PLAYING';
export const MUTE_PREVIEW = 'MUTE_PREVIEW';
export const SAVE_SEARCH_INPUT = 'SAVE_SEARCH_INPUT';

export const setPreviewVideo = (value = null) => ({
  type: SET_PREVIEW_VIDEO,
  payload: value,
});

export const muteNowPlaying = (muted = false) => ({
  type: MUTE_NOW_PLAYING,
  payload: muted,
});

export const mutePreview = (muted = false) => ({
  type: MUTE_PREVIEW,
  payload: muted,
});

export const saveSearchInput = (text = '') => ({
  type: SAVE_SEARCH_INPUT,
  payload: text,
});
