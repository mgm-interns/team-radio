/* eslint-disable */
//var station = require('../Controllers/StationController');
var station = require('../Controllers/TEST_CONTROLLER');

export default router => {
  // create a station

  router.post('/stations', function(req, res) {
    //   res.send('Ok');
    station.addStation(req, res);
  });

  //// get a station by name
 /* router.get('/stations/:stationName', function(req, res) {
    station.getStationByName(req, res);
  });
  */
  /*
  router.get('/stations/:url', function(req, res) {
    station.getStationByUrl(req, res);
  });
  */
 
  router.get('/stations/:id', function(req, res) {
    station.getStationById(req, res);
  });

  //// get list station but can limit if need
  router.get('/stations', function(req, res) {
    station.getStations(req, res);
    //  stationController.getListVideo(req,res);
  });
  // add a new video

  router.put('/stations/:_id', function(req, res) {
    station.addSong(req, res);
  });
  router.put('/stations/get/:_id', function(req, res) {
    console.log("router");
    station.setNowPlayingSong(req, res);
  });
};
