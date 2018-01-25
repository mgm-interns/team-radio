import searchController from '../controllers/search';
import * as CONSTANTS from '../const/constants';
import station from '../../test/test';

export default router => {
  router.post('/stations', function(req, res) {
    station.addStation(req, res);
  });

  router.put('/stations', function(req, res) {
    station.deleteStation(req, res);
  });

  router.get('/stations/:id', function(req, res) {
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
    station.getAllAvailableStations(req, res);
  });

  router.get('/stations/playlist/:id', function(req, res) {
    station.getListSong(req, res);
  });

  router.get('/stations/get/all', function(req, res) {
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

  router.put('/stations/getstationbyadded/get', function(req, res) {
    station.getListStationUserAddedSong(req, res);
  });

  router.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    const result = await searchController(query, CONSTANTS.SEARCH_LIMIT);
    res.json(result);
  });
};
