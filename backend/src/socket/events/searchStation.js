import * as EVENTS from '../../const/actions';
import * as searchController from '../../controllers/search';

export default async (emitter, searchQuery) => {
  // Search perform when query is not null
  const query = searchQuery.trim();
  if (query) {
    const stations = await searchController(query);
    emitter.emit(EVENTS.SERVER_SEARCH_STATION_RESULT, {
      stations: stations,
    });
  } else {
    emitter.emit(EVENTS.SERVER_SEARCH_STATION_RESULT, {
      stations: [],
    });
  }
};
