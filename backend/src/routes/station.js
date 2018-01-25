import searchController from '../controllers/search';
import * as CONSTANTS from '../const/constants';
import station from '../../test/test';

export default router => {
  router.post('/stations', (req, res) => {
    station.addStation(req, res);
  });

  router.put('/stations', (req, res) => {
    station.deleteStation(req, res);
  });

  router.get('/stations/:id', (req, res) => {
    station.getStation(req, res);
  });

  router.put('/stations/:id', (req, res) => {
    station.addSong(req, res);
  });

  router.put('/stations/field/:id', (req, res) => {
    station.updateStartingTime(req, res);
  });

  router.put('/stations/songIds/:id', (req, res) => {
    station.setPlayedSongs(req, res);
  });

  router.get('/stations', (req, res) => {
    station.getAllAvailableStations(req, res);
  });

  router.get('/stations/playlist/:id', (req, res) => {
    station.getListSong(req, res);
  });

  router.get('/stations/get/all', (req, res) => {
    station.getAllStationDetails(req, res);
  });

  router.put('/stations/upvote/:id', (req, res) => {
    station.upVote(req, res);
  });

  router.put('/stations/downvote/:id', (req, res) => {
    station.downVote(req, res);
  });

  router.get('/stations/listhistory/:id', (req, res) => {
    station.getListSongHistory(req, res);
  });

  router.get('/stations/listavailable/:id', (req, res) => {
    station.getAvailableListSong(req, res);
  });

  router.put('/stations/setisprivate/:id', (req, res) => {
    station.setIsPrivateOfStation(req, res);
  });

  router.put('/stations/getstationbyadded/get', (req, res) => {
    station.getListStationUserAddedSong(req, res);
  });
  router.put('/stations/getStationsByUserId/get', (req, res) => {
    station.getStationsByUserId(req, res);
  });

  router.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    if (query) {
      const result = await searchController(query, CONSTANTS.SEARCH_LIMIT);
      res.json(result);
      return;
    }
    res.json([]);
  });
};
