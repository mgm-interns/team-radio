/* eslint-disable */
var mongoose = require('mongoose');
var Station = require('./../Models/Station');
var Song = require('./SongController');

// create a station
var stationController = {};
module.exports = stationController;

stationController.addStation = async function (stationName,callback) {

  var station = {
    station_name: stationName
  };
  if (!stationName) {
    callback(null,null);
  } else {
    // Check if station is available
    Station.getStationByName(stationName, function (err, currentStation) {
      if (err) throw err;

      if (!currentStation) {
        // Create a new station
      
        Station.addStation(station, function (err, station) {
          if (err) throw err;
          console.log('station : ' + station);
          console.log('***2****');
       
          callback(null,station);
        });
        console.log('***4****');
       
        //var station =  await Station.addStation(station);
       
      } else {
        callback(null,null);
       // return null;
      }
    });
  }
};

// get a station by name

stationController.getStationByName = function (stationName,callback) {

  Station.getStationByName(stationName, function (err, currentStation) {
    if (err) throw err;

    if (!currentStation) {
      callback(null,null);
    } else {
      callback(null,currentStation);
    }
  });
};

// get list station but can limit if need
stationController.getStations = function (callback) {
  Station.getStations(function (err, stations) {
    if (err) throw err;

    callback(null,stations);
  });
};

// get play list 
stationController.getListSong = function (stationName,callback) {
  Station.findSongIdOfPlaylist(stationName, function (err, listSongs) {
    if (err) throw err;

    callback(null,listSongs);
  });
}

// add the information the song in db
stationController.addSong = async function (stationName, songUrl,callback) {
  // check url has empty
  if (!songUrl) {
    return null;
  } else {
    var song = await Song.addNewSong(songUrl);
    // if Song module can not add in collection
    if (!song) {
      callback(null,null);
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
               // return currentListSong;
               callback(null,currentListSong);
              })
            })
          });
        } else {
          callback(null,null);
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

