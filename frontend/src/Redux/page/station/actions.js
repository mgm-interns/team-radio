export const SET_PREVIEW_VIDEO = 'SET_PREVIEW_VIDEO';

export const setPreviewVideo = (value = null) => ({
  type: SET_PREVIEW_VIDEO,
  payload: value,
});
