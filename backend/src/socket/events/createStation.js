/** *******************************************************
 *                                                        *
 *                                                        *
 *                     CREATE STATION                     *
 *                        By Ryker                        *
 *                                                        *
 *                                                        *
 ******************************************************** */

import * as stationController from '../../controllers/station';
import * as switcher from '../../switcher';
import * as players from '../../players';
import * as EVENTS from '../../const/actions';

export default async (emitter, userId, stationName, isPrivate) => {
  let station;

  try {
    /**
     * addStation function will return that station if create success
     * If not, it will throw an Error object with error message
     */
    if(userId) {
        station = await stationController.addStation(
            stationName,
            userId,
            isPrivate,
        );
    }
    else {
        //let clientCookieToken = checkClientToken();
        let clientCookieToken = 'a';
        station = await stationController.addStation(
            stationName,
            userId,
            isPrivate,
            clientCookieToken
        );
    }
    emitter.emit(EVENTS.SERVER_CREATE_STATION_SUCCESS, {
      station: station,
    });
  } catch (err) {
    emitter.emit(EVENTS.SERVER_CREATE_STATION_FAILURE, {
      message: err.message,
    });
    return;
  }

  //  If station is created, create player for that station
  try {
    await players.getPlayer(station.station_id);
  } catch (err) {
    console.error('Players error: ' + err.message);
  }

  // If station is created, let all user of Team Radio update station list
  if (station.is_private === false) {
    const stations = switcher.getPopularStations();
    emitter.emitAll(EVENTS.SERVER_UPDATE_STATIONS, {
      stations: stations,
    });
  }
};

function checkClientToken() {
    let clientCookieToken = localStorage.getItem('anonymous-user-token');
    if(!clientCookieToken){
      clientCookieToken = randomString(20);
      localStorage.setItem("anonymous-user-token", clientCookieToken);
    }
    return clientCookieToken;
}

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
