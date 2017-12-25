/* eslint-disable */
var station = require('../Controllers/StationController');

export default router => {
  // create a station

  router.post('/stations', function(req, res) {
    //   res.send('Ok');
    station.addStation(req, res);
  });

  //// get a station by name
  router.get('/stations/:stationName', function(req, res) {
    station.getStationByName(req, res);
  });
  //// get list station but can limit if need
  router.get('/stations', function(req, res) {
    station.getStations(req, res);
    // stationController.getListVideo(req,res);
  });
  // add a new video
  /*
  router.put('/stations/:stationName',function(req,res){
      station.addVideo(req,res);
  })
  */
};
