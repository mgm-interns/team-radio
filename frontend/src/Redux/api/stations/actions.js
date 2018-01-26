import { CLIENT_CREATE_STATION } from 'Redux/actions';

export const createStation = ({
  stationName,
  userId = '0',
  isPrivate = false,
}) => ({
  type: CLIENT_CREATE_STATION,
  payload: { stationName: stationName.toString(), userId, isPrivate },
});

export default {
  createStation,
};
