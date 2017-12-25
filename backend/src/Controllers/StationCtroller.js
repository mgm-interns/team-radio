/* eslint-disable */
var mongoose = require('mongoose');
//var Promise = require('promise');
var ResponeModel = require('./../Models/ResponeModel').default;
var Station = require('./../Models/Station');
var Song = require('./SongController');

// create a station
var stationController = {};
module.exports = stationController;

stationController.addStation = function (req, res) {
  var station = req.body;
  var stationName = station.station_name;
 
  if (!station.station_name) {
    var errorRes = {
      name: 'The name is empty',
     };
    console.log(errorRes);
    var responseObj = new ResponeModel(false, null, errorRes);

    res.status(422).json(responseObj);

  } else {
    // Check if station is available
    Station.getStationByName(stationName, function (err, currentStation) {
      if (err) {
        var responseObj = new ResponeModel(false, null, err);
        res.status(400).json(responseObj);
        throw err;
      }

      if (!currentStation) {
        // Create a new station
        Station.addStation(station, function (err, newStation) {
          if (err) throw err;

          console.log(newStation);
          var responseObj = new ResponeModel(true, newStation, null);
          res.json(responseObj);
        });
      } else {
        var error = {
          name: 'The station name available !',
        };
        var responseObj = new ResponeModel(false, null, error);
        res.status(400).json(responseObj);
      }
    });
  }
};

// get a station by name
stationController.getStationByName = function (req, res) {
  var stationName = req.params.stationName;
  console.log("stationName : "+stationName);
  Station.getStationByName(stationName, function (err, currentStation) {
    if (err) {
      var responseObj = new ResponeModel(false, null, err);
      res.status(400).json(responseObj);
      throw err;
    }
    console.log("currentStation : "+currentStation);
    if (!currentStation) {
      console.log('err : ' + err);
      var error = {
        name: 'Can not find station name.'
      }
      var responseObj = new ResponeModel(false, null, error);
      res.status(404).json(responseObj);
    } else {
      var responseObj = new ResponeModel(true, currentStation, null);
      res.json(responseObj);
    }
  });
};

// get list station but can limit if need
stationController.getStations = function (req, res) {
  Station.getStations(function (err, stations) {
    if (err) {
      var responseObj = new ResponeModel(false, null, err);
      res.status(400).json(responseObj);
      throw err;
    } else {
      var responseObj = new ResponeModel(true, stations, null);
      res.json(responseObj);
    }
  });
};

// get play list 
stationController.getListVideo = function (req, res) {
  var stationName = 'Station2';
  Station.findSongIdOfPlaylist(stationName, function (err, response) {
    if (err) throw err;
    console.log(stationName);
    res.send(response);
  });
}

// add the information the song in db
stationController.addSong = async function (req, res) {
  var stationName = req.params.stationName;
  var songReq = req.body;
  var songUrl = req.body.url;

  // check url has empty
  if (!songUrl) {
    var error = {
      url: 'The url is emply !'
    }
    var responseObj = new ResponeModel(false, null, error);
    res.status(400).json(responseObj);

  } else {
    var song = await Song.addNewSong(songUrl);

    // if Song module can not add in collection
    if (!song) {
      var error = {
        name: 'Cannot add song to station !'
      }
      var responseObj = new ResponeModel(false, null, error);
      res.status(400).json(responseObj);
    } else {
    console.log('station name : '+stationName);
      // get playlist of station
      Station.getPlaylistOfStation(stationName, function (err, currentStation) {
        if (err) {
          var responseObj = new ResponeModel(false, null, error);
          res.status(400).json(responseObj);
          throw err;
        }
        console.log(currentStation);
        var playlist = currentStation.playlist;
        console.log(playlist);
        // if have not id in playlist
        if (validateDuplicatedSong(song._id, currentStation)) {
          Station.addSong(stationName, { songId: song._id }, function (err, currentStation) {
            if (err) {
              var responseObj = new ResponeModel(false, null, err);
              res.status(400).json(responseObj);
              throw err;
            }
            console.log("currentStation  " + currentStatio);
        /*    getAllInfoPlaylist(currentStation.playList, function (err, playList) {
              var responseObj = new ResponeModel(true, playList, null);
              res.json(responseObj);
            });
            */
            res.json(getAllInfoPlaylist(currentStation.playList));
          });
        } else {
          var error = {
            name: 'The video is available'
          }
          var responseObj = new ResponeModel(false, null, error);
          res.status(400).json(responseObj);
        }
      });
    }
  }
}

/**
 * check song id has playlist 
*/
function validateDuplicatedSong(videoId, playList) {
  for (var i = 0; i < playList.length; i++) {
    if (playList[i].songId === videoId) {
      return false;
    }
  }
  return true;
}

/**
 *  get all information playlist of station with informaton of video
 * 
*/
async function getAllInfoPlaylist(playList, callback) {
  // console.log('length playlist : ------>> ' + playList.length);
 // var promises = [];
  for (var i = 0; i < playList.length; i++) {
    var song = await Song.getSongInformation(playList[i].songId);
    playList[i].description = song;
    /*
    promises.push(new Promise(function (resolve, reject) {
      Song.getSongInformation(playList[i].songId).exec(function (err, song) {
        if (err) {
          reject(err);
          throw err
        }
        playList[i].description = song;
        console.log("i = " + i + "****" + playList[i].description);
        resolve();
      });
    }))
    Promise.all(promises)
      .then(function () {
        callback(null, playList);
      })
      .catch(function (err) {
        callback(err, null);
      });
      */
  }
  return playList;
}
// add new song at station

