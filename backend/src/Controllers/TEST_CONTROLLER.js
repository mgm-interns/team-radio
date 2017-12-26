var stationController = require('./StationController');

// create a station
var station = {};
module.exports = station;

station.addStation = function(req, res) {
  //  var station = await stationController.addStation(req.body.station_name);
  stationController.addStation(req.body.station_name, function(station) {
    console.log('add station : ' + station);
    console.log('***3****');
    res.json(station);
  });
};
station.getStationByName = function(req, res) {
  stationController.getStationByName(req.params.stationName, function(station) {
    res.json(station);
  });
};
station.getStationByUrl = function(req, res) {
  stationController.getStationByUrl(req.params.url, function(station) {
    res.json(station);
  });
};
station.getStations = function(req, res) {
  stationController.getStations(function(stations) {
    res.json(stations);
  });
};
station.addSong = function(req, res) {
  stationController.addSong(req.params.stationName, req.body.url, function(
    allInfo,
  ) {
    res.json(allInfo);
  });
};
