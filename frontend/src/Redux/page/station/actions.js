export const SET_PREVIEW_VIDEO = 'SET_PREVIEW_VIDEO';
export const MUTE_VIDEO_REQUEST = 'MUTE_VIDEO_REQUEST';
export const SAVE_HISTORY = 'SAVE_HISTORY';
export const SAVE_PLAYLIST = 'SAVE_PLAYLIST';
export const REPLAY_REQUEST = 'REPLAY_REQUEST';

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
