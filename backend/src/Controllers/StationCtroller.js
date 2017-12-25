/* eslint-disable */
var mongoose = require('mongoose');
var Promise = require('promise');
var Station = require('./../Models/Station');
var Song = require('./SongController');

// create a station
var stationController = {};
module.exports = stationController;

stationController.addStation = function (stationName) {

  var station = {
    station_name: stationName
  };
  if (!stationName) {
    return null;
  } else {
    // Check if station is available
    Station.getStationByName(stationName, function (err, currentStation) {
      if (err) throw err;

      if (!currentStation) {
        // Create a new station
        Station.addStation(station, function (err, newStation) {
          if (err) throw err;
          return newStation;
        });
      } else {
        return null;
      }
    });
  }
};

// get a station by name

stationController.getStationByName = function (stationName) {

  Station.getStationByName(stationName, function (err, currentStation) {
    if (err) throw err;

    if (!currentStation) {
      return null;
    } else {
      return currentStation;
    }
  });
};

// get list station but can limit if need
stationController.getStations = function () {
  Station.getStations(function (err, stations) {
    if (err) throw err;

    return stations;
  });
};

// get play list 
stationController.getListSong = function (stationName) {
  Station.findSongIdOfPlaylist(stationName, function (err, listSongs) {
    if (err) throw err;

    return listSongs;
  });
}

// add the information the song in db
stationController.addSong = async function (stationName, songUrl) {
  // check url has empty
  if (!songUrl) {
    return null;
  } else {
    var song = await Song.addNewSong(songUrl);
    // if Song module can not add in collection
    if (!song) {
      return null;
    } else {

      // get playlist of station
      Station.getPlaylistOfStation(stationName, function (err, currentStation) {
        if (err) throw err;

        var currentPlaylist = currentStation.playlist;
        // if have not id in playlist
        if (validateDuplicatedSong(song._id, currentPlaylist)) {
          Station.addSong(stationName, { song_id: song._id }, function (err, object) {
            if (err) throw err;

            console.log("object  " + JSON.stringify(object));
            // object have not list song of station
            Station.getPlaylistOfStation(stationName, function (err, currentListSong) {
              if (err) throw err;
              getAllInfoPlaylist(currentListSong.playlist, function (err, currentListSong) {
                if (err) throw err;
                return currentListSong;
              })
            })
          });
        } else {
          return null;
        }
      });
    }
  }
}

/**
 * check song id has playlist 
*/
function validateDuplicatedSong(songId, playList) {
  for (var i = 0; i < playList.length; i++) {
    if (playList[i].song_id.equals(songId)) {
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
  for (var i = 0; i < playList.length; i++) {
    var song = await Song.getSongInformation(playList[i].song_id);
    //console.log('iii : ------>> ' + i);
    playList[i].description = song;
  }
  var listInfor = playList;
  // console.log('play list : <<------>> ' + listInfor);
  callback(null, listInfor);
}
// add new song at station

