/* eslint-disable */

var mongoose = require('mongoose');
var stationController = {};
var ResponeModel = require('./../Models/ResponeModel').default;
var Station = require('./../Models/Station');
// create a station
stationController.addStation = function(req, res) {
  var station = req.body;
  console.log(station);
  var stationName = station.stationName;

  //check available of station
  Station.getStationByName(stationName, function(err, mess) {
    if (err) throw err;

    //  console.log(station);
    if (mess == null) {
      // create station
      Station.addStation(station, function(err, stationCallBack) {
        if (err) throw err;
        var response = new ResponeModel(true, stationCallBack, null);
        console.log(stationCallBack);
        res.json(response.get());
      });
    } else {
      var error = {
        name: 'The station name available !',
      };
      var response = new ResponeModel(false, null, error);
      res.json(response.get());
    }
  });
};
// get a station by name
stationController.getStationByName = function(req, res) {
  var stationName = req.params.stationName;
  Station.getStationByName(stationName, function(err, station) {
    if (err) {
      throw err;
    }
    if (station == null) {
      console.log('err : ' + err);
      var response = new ResponeModel(false, null, error);
      res.json(response.get());
    } else {
      var response = new ResponeModel(true, station, null);
      res.json(response.get());
    }
  });
};
// get list station but can limit if need
stationController.getStations = function(req, res) {
  Station.getStations(function(err, stations) {
    if (err) {
      throw err;
      var response = new ResponeModel(false, null, err);
      res.json(response.get());
    } else {
      var response = new ResponeModel(true, stations, null);
      res.json(response.get());
    }
  });
};

module.exports = stationController;
// add new a song in station
