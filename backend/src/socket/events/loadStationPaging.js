import * as EVENTS from "../../const/actions";
import * as switcher from '../../switcher';

export default async (emitter) => {
    try {
        var stations = switcher.getPopularStations();
        emitter.emit(EVENTS.SERVER_LOAD_STATION_PAGING, {
            stations: stations,
        });
    } catch (err) {
        console.log('Server load station error');
    }
};