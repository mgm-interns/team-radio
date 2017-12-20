var station = require('../Controllers/StationCtroller');

export default router => {
  // create a station

  router.post('/add/addstation', function(req, res) {
    //   res.send('Ok');
    station.addStation(req, res);
  });

  //// get a station by name
  router.get('/:stationName', function(req, res) {
    station.getStationByName(req, res);
  });
  //// get list station but can limit if need
  router.get('/list/stations', function(req, res) {
    station.getStations(req, res);
  });
};
