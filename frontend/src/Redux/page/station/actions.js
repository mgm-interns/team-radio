export const SET_PREVIEW_VIDEO = 'SET_PREVIEW_VIDEO';
export const SAVE_SEARCH_INPUT = 'SAVE_SEARCH_INPUT';

export const MUTE_PLAYER = 'MUTE_PLAYER';

export const saveSearchInput = (value = '') => ({
  type: SAVE_SEARCH_INPUT,
  payload: value,
});

export const setPreviewVideo = (value = null) => ({
  type: SET_PREVIEW_VIDEO,
  payload: value,
});

export const mutePlayer = (isMute = false) => ({
  type: MUTE_PLAYER,
  payload: isMute,
});
