export const REDIRECT_TO_STATION_PAGE_REQUEST =
  'REDIRECT_TO_STATION_PAGE_REQUEST';

export const redirectToStationPageRequest = (isRedirect = false) => ({
  type: REDIRECT_TO_STATION_PAGE_REQUEST,
  payload: { isRedirect },
});
