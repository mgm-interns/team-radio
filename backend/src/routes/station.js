/* eslint-disable */
//var station = require('../Controllers/StationController');
var station = require('../../test/test');

export default router => {
  // create a station

  router.post('/stations', function(req, res) {
    //   res.send('Ok');
    console.log('add stations');
    station.addStation(req, res);
  });
  router.put('/stations', function(req, res) {
    //   res.send('Ok');
    console.log('add stations');
    station.deleteStation(req, res);
  });
  router.get('/stations/:id', function(req, res) {
    //   res.send('Ok');
    station.getStation(req, res);
  });
  router.put('/stations/:id', function(req, res) {
    station.addSong(req, res);
  });
  router.put('/stations/field/:id', function(req, res) {
    station.updateStartingTime(req, res);
  });
  router.put('/stations/songIds/:id', function(req, res) {
    station.setPlayedSongs(req, res);
  });
  router.get('/stations', function(req, res) {
    console.log("getStations")
    station.getAllAvailableStations(req, res);
  });
  router.get('/stations/playlist/:id', function(req, res) {
    station.getListSong(req, res);
  });
  router.get('/stations/get/all', function(req, res) {
    console.log('router ');
    station.getAllStationDetails(req, res);
  });
  router.put('/stations/upvote/:id', function(req, res) {
    station.upVote(req, res);
  });
  router.put('/stations/downvote/:id', function(req, res) {
    station.downVote(req, res);
  });
  router.get('/stations/listhistory/:id', function(req, res) {
    station.getListSongHistory(req, res);
  });
  router.get('/stations/listavailable/:id', function(req, res) {
    station.getAvailableListSong(req, res);
  });
  router.put('/stations/setisprivate/:id', function(req, res) {
    station.setIsPrivateOfStation(req, res);
  });

  // router.put('/stations/getstationbyadded/get', function(req, res) {
  //   console.log("***********************");
  //   station.getListStationUserAddedSong(req, res);
  // });
};
