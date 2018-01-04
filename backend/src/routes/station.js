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
    station.getStations(req, res);
  });
  router.get('/stations/playlist/:id', function(req, res) {
    station.getListSong(req, res);
  });
  router.put('/stations/upvote/:id', function(req, res) {
    station.upVote(req, res);
  });
  router.put('/stations/downvote/:id', function(req, res) {
    station.downVote(req, res);
  });
};
