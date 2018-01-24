import * as EVENTS from '../../const/actions';
import * as searchController from '../../controllers/search';

export default async (emitter, query) => {
  const stations = await searchController.searchStationByName(query);
  emitter.emit(EVENTS.SERVER_SEARCH_STATION_RESULT, {
    stations: stations,
  });
};
