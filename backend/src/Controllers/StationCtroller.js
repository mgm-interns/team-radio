/* eslint-disable */

var mongoose = require('mongoose');
var stationController = {};
var ResponeModel = require('./../Models/ResponeModel').default;
var Station = require('./../Models/Station');
var Song = require('./SongController');
// create a station
stationController.addStation = function(req, res) {
  var station = req.body;
  var stationName = station.stationName;
  
   if(station.stationName == '')
   {
    var errorRes = {
       name : 'The name is empty',
       url : ''
     }
     console.log(errorRes);
    var response = new ResponeModel(false, null,errorRes);
    res.status(422).json(response.get());
   }
   else{
  //check available of station
    Station.getStationByName(stationName, function(err, mess) {
      if (err){
        throw err;
        
        var response = new ResponeModel(false, null, err);
        res.status(400);
        res.json(response.get());
      } 
      
      //  console.log(station);
      if (mess == null) {
        // create station

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
stationController.getStationByName = function(req, res) {
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
       name : 'Can not find station name.'
     }
      var response = new ResponeModel(false, null, error);
      res.status(404).json(response.get());
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
      res.status(400).json(response.get());
     } else {
      var response = new ResponeModel(true, stations, null);
      res.json(response.get());
    }
  });
};

// get play list 
stationController.getListVideo = function(req,res)
{
   var stationName = 'Station2';
   Station.findSongIdOfPlaylist(stationName,function(err,response){
     if(err) throw err;
      console.log(stationName);
      res.send(response);
   });
}

// add the information the video in db
stationController.addVideo = async function(req,res)
{
    var stationName = req.params.stationName;
    var videoUrl = req.body;
    
    // check url has empty
   if(videoUrl.url =='')
    {
      var error = {
        url : 'The url is emply !'
      }
      var response = new ResponeModel(false, null, error);

      res.status(400).json(response.get());
     
    }
    else{
      var video = await Song.addNewSong(videoUrl.url);
     // console.log(video);
      // if Song module can not add in collection
      if(video == null)
      {
        var error = {
          name : 'Can not add video in station !'
        }
        var response = new ResponeModel(false, null, error);
        res.status(400).json(response.get());
      }
      else{ 
        // check id of song has playlist
         Station.getPlaylistOfStation(stationName,function(err,callback){
            if(err){
              throw err;
              var response = new ResponeModel(false, null, error);
              res.status(400).json(response.get());
            }
            var jsonCallBack = callback.playlist;
             // if have not id in playlist
             if(checkIdVideo(video._id,jsonCallBack)==false)
             {
                var videoToAddPlayList = {
                songId : video._id
               }
                Station.addVideo(stationName,videoToAddPlayList,function(err,results){
                  if(err) throw err;
                  res.json(results);
                })
             }
              // if have id in playlist
             else{
                var error = {
                  name : 'The video is available'
                }
                var response = new ResponeModel(false, null, error);
                res.status(400).json(response.get());
             }
           
         })
       
      }
     
    }
  
    
}
 /**
  * check song id has playlist 
 */
var checkIdVideo = function(videoId,playList)
{
  for(var i=0;i<playList.length;i++)
  {
     if(playList[i].songId == videoId)
     {
       //if has
        return true;
     }
  }
  // if not has
  return false;
}

// add new song at station
module.exports = stationController;

