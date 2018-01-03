export const CREATE_STATION = 'CREATE_STATION';

export const createStation = ({ userId = 0, stationName }) => ({
  type: CREATE_STATION,
  payload: { userId, stationName },
});
