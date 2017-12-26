import { TIMEOUT } from 'dns';

const stationModel = require('../Models/Station');

module.exports.start = function() {
  // Get information about nowplaying song in stations
  stationModel.getStations(function(err, stationList) {
    for (var i = 0; i < stationList.length; i++) {
      if (stationList[i].now_playing != null) {
        setTimeout(function() {
          getNextNowPlayingSong(stationList[i].id);
        }, stationList[i].now_playing.duration);
      }
    }
  });
  return true;
};

module.exports.addNowPlaying = function(stationNsp, songId, duration) {
  // Add new song to the station
  return true;
};

function getNextNowPlayingSong() {
  return true;
}
