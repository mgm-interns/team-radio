import Worker, { normalizeDate } from '../models/worker';
import { workerlog } from './logger';
import { scanStations } from './stations';
import { scanCommits } from './commits';

export const startWorker = async () => {
  workerlog('stating worker');

  const todayWorker = await Worker.findOne({ finished_on: normalizeDate() });
  if (todayWorker) {
    // Worker has already run in this date, let him rest
    workerlog('Worker has already run in this date, let him rest');
    return null;
  }

  const [stationsResult] = await Promise.all([scanStations(), scanCommits()]);

  const removedStations = stationsResult.map(id => ({ station_id: id }));

  workerlog(removedStations);

  return Worker.create({
    removed_stations: removedStations,
  });
};

// Auto start the worker every 15minute
// The worker maybe a heavy task runner that may effect to the runtime
// So that it should only 1 time each day
// There is a check before actually run the worker
// So that it is safe to call the worker every 15 minute
export default () => {
  setInterval(startWorker, 15 * 60 * 1000);
  //                       min  sec  msec
};
