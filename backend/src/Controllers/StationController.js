/* eslint-disable */
var mongoose = require('mongoose');
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

          callback(station);
        });
      } else {
        callback(null);
        // return null;
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
          Station.addSongByStationId(stationId, {
            song_id: song._id
          }, function (err, object) {
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

    if (!currentUrl) {
      i = i + 1;
      newUrl = url + i;
    } else {
      createStationUrl(currentUrl);
    }
  });
  callback(newUrl);
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

/*
async function createStationUrl(stationName) {
  var url = stringToUrl(stationName);
  console.log('****- url : ' + url);
  var newUrl = url;
  var i = 1;
  console.log('0 - url : ' + newUrl);
  while ((await Station.getStationByUrl(newUrl)) != null) {
    i = i + 1;
    newUrl = url + i;
  }
  console.log('1 - url : ' + newUrl);
  return newUrl;
}
*/