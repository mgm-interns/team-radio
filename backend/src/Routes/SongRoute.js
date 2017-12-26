// Prefix: api
const SongController = require('../Controllers/SongController.js');
const bodyParser = require('body-parser');

async function getSongInformationApi(req, res) {
  if (req.body.url === undefined) {
    req.send('none');
  } else {
    const songUrl = req.body.url;
    const song = await SongController.addSong(songUrl);
    if (song === null) {
      res.send('none');
    } else {
      res.send(song);
    }
  }
}

export default router => {
  // For demonstration
  router.post('/song', (req, res) => {
    getSongInformationApi(req, res);
  });
};
