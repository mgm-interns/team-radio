import _ from 'lodash';
import Station from '../models/station';
import { workerlog, workerError } from './logger';

/* eslint-disable no-await-in-loop */
export const scanStations = async () => {
  const today = new Date().getTime();
  const stations = await Station.find(
    { is_delete: false },
    { station_name: 1, created_date: 1, playlist: 1, station_id: 1, _id: 0 },
  );
  if (!stations) return null;

  const removedStations = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const mStation of stations) {
    const station = mStation.toObject();
    if (station && station.playlist) {
      let timestamp;
      if (station.playlist.length === 0) {
        timestamp = station.created_date + 7 * 24 * 60 * 60 * 1000;
        //                                day  hour min  sec  msec
      } else {
        const latestSong = _.maxBy(station.playlist, song => song.created_date);
        if (!latestSong) {
          const result = await deleteStation(station.station_id);
          removedStations.push(result);
        }
        timestamp = latestSong.created_date + 30 * 24 * 60 * 60 * 1000;
        //                                    day  hour min  sec  msec
      }
      // If the station has no song and is created 7 or 30 days ago (base on above condition)
      // Kill the station
      if (timestamp < today) {
        workerlog('station inactive for 7/30 days', station.station_id);
        const result = await deleteStation(station.station_id);
        removedStations.push(result);
      }
    } else {
      // Delete the station if this station doesn't have a playlist
      workerlog("station that doesn't have playlist", station.station_id);
      const result = await deleteStation(station.station_id);
      removedStations.push(result);
    }
  }

  // Remove all null result
  return removedStations.filter(id => id !== null);
};

async function deleteStation(stationId) {
  workerlog('start removing station with id: ', stationId);
  const stations = await Station.find(
    { is_delete: false },
    { station_id: 1, _id: 1 },
  );
  // Remove if there is more than 10 stations
  if (stations.length > 10)
    return Station.remove({
      station_id: stationId,
    })
      .then(() => stationId)
      .catch(() => {
        workerError('remove station with id: ' + stationId);
      });
  workerError('The stations are less than 10, stop this action ' + stationId);
  return null;
}

export default { scanStations };
