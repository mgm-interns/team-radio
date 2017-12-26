/* eslint-disable */

var mongoose = require('mongoose');
var stationController = {};
var ResponeModel = require('./../Models/ResponeModel').default;
var Station = require('./../Models/Station');
var Song = require('./SongController');
// create a station
var stationController = {};
module.exports = stationController;
// add a station
stationController.addStation = async function (stationName, callback) {
  if (!stationName) {
    callback(null);
  } else {
    // Check if station is available
    Station.getStationByName(stationName, function (err, currentStation) {
      if (err) throw err;

      if (!currentStation) {
        // Create a new station
        var currentUrl;
        createStationUrl(stationName, function (url) {
          currentUrl = url;
        });
        var station = {
          station_name: stationName,
          url: currentUrl,
        };
        Station.addStation(station, function (err, station) {
          if (err) throw err;

        Station.addStation(station, function(err, stationCallBack) {
          if (err) throw err;
          console.log(stationCallBack);
          var response = new ResponeModel(true, stationCallBack, null);
          console.log(stationCallBack);
          res.json(response.get());
        });
      } else {
        var error = {
          name: 'The station name available !',
        };
        var response = new ResponeModel(false, null, error);
        res.status(400).json(response.get());
      }
    });
  }
};
// get a station by name
stationController.getStationByName = function (stationName, callback) {
  Station.getStationByName(stationName, function (err, currentStation) {
    if (err) throw err;

    if (!currentStation) {
      callback(null);
    } else {
      getAllInfoPlaylist(currentStation.playlist, function (err, playlist) {
        currentStation.playlist = playlist;
        callback(currentStation);
      });
    }
  });
};
// get a station by url
stationController.getStationByUrl = function (urlOfStation, callback) {
  Station.getStationByUrl(urlOfStation, function (err, currentStation) {
    if (err) throw err;

// get a station by name
stationController.getStationByName = function(req, res) {
  // (stationName)
  var stationName = req.params.stationName;
  Station.getStationByName(stationName, function(err, station) {
    if (err) {
      throw err;
      var response = new ResponeModel(false, null, err);
      res.status(400).json(response.get());
    }
    if (station == null) {
      console.log('err : ' + err);
      var error = {
        name: 'Can not find station name.',
      };
      var response = new ResponeModel(false, null, error);
      res.status(404).json(response.get());
    } else {
      getAllInfoPlaylist(currentStation.playlist, function (err, playlist) {
        currentStation.playlist = playlist;
        callback(currentStation);
      });
    }
  });
};
// get a station by id
stationController.getStationById = function (stationId, callback) {
  Station.getStationById(stationId, function (err, currentStation) {
    if (err) throw err;

    console.log('currentStation : ' + currentStation);
    if (!currentStation) {
      callback(null);
    } else {
      getAllInfoPlaylist(currentStation.playlist, function (err, playlist) {
        currentStation.playlist = playlist;
        callback(currentStation);
      });
    }
  });
};

stationController.getStationById = function(stationId) {
  // return a station
};

// get list station but can limit if need
stationController.getStations = function (callback) {
  Station.getStations(function (err, stations) {
    if (err) throw err;

    callback(stations);
  });
};

// get play list
stationController.getListSong = function (stationName, callback) {
  Station.findSongIdOfPlaylist(stationName, function (err, listSongs) {
    if (err) throw err;

    callback(listSongs);
  });
};

// add the information the song in db
stationController.addSong = async function (stationId, songUrl, callback) {
  // check url has empty
  if (!songUrl) {
    callback(null);
  } else {
    var song = await Song.addSong(songUrl);
    // if Song module can not add in collection
    if (!song) {
      callback(null);
    } else {
      // get playlist of station
      Station.getPlaylistOfStationById(stationId, function (err, currentStation) {
        if (err) throw err;

        var currentPlaylist = currentStation.playlist;
        // if have not id in playlist
        if (validateDuplicatedSong(song._id, currentPlaylist)) {
          Station.addSongByStationId(stationId, { song_id: song._id }, function (err, object) {
            if (err) throw err;
            
            // object have not list song of station
            Station.getPlaylistOfStationById(stationId, function (err, currentListSong) {
              if (err) throw err;
              getAllInfoPlaylist(currentListSong.playlist, function (err, currentListSong) {
                if (err) throw err;
                // return currentListSong;
                callback(currentListSong);
              });
            });
          });
        } else {
          callback(null);
        }
      });
    }
  }
};
/**
 * The function help covert string to url of station
 * */
function stringToUrl(str) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}
function createStationUrl(stationName, callback) {
  var url = stringToUrl(stationName);
  var newUrl = url;
  var i = 1;
  Station.getStationByUrl(newUrl, function (err, currentUrl) {
    if (err) throw err;

/*
// get play list 
stationController.getListVideo = function(req,res)
{
   var stationName = 'Station2';
   Station.findSongIdOfPlaylist(stationName,function(err,response){
     if(err) throw err;
      console.log(stationName);
      console.log(response);
   });
}
// add the information the video in db
stationController.addVideo = async function(req,res)
{
    var stationName = req.params.stationName;
    var video = req.body;
    // check url has empty
   if(video.url =='')
    {
      var error = {
        url : 'The url is emply !'
      }
      var response = new ResponeModel(false, null, error);
      res.json(response.get());
      res.status(422);
    }
    else{
      var result = await Song.addNewSong(video.url);
      // if Song module can not add in collection
      if(result == null)
      {
        var error = {
          name : 'Can not add video in station !'
        }
        var response = new ResponeModel(false, null, error);
        res.json(response.get());
        
      }
      else{
        // check id of song has playlist
     //   if()
     //   {

     //   }
     //   else{
          var videoToAddPlayList = {
            songId : video._id
          } 
          Station.addVideo(stationName,videoToAddPlayList,function(err,mess){
            if(err) throw err;
            else res.json(mess);
  
        })
     //   }
     
      }
     
    }
  
    
}
// add new song at station
*/
module.exports = stationController;
