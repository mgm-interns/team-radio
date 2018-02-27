import * as stationController from "../../controllers/station";
import * as EVENTS from "../../const/actions";

export default async (emitter, typeLoad) => {
    try {
        // Check if stationId is not exist, decline join request
        const stations = await stationController.loadStation(typeLoad);
        emitter.emitAll(EVENTS.SERVER_LOAD_STATION_PAGING, {
            stations: stations,
        });
    } catch (err) {
        console.log('Server load station error');
    }
};