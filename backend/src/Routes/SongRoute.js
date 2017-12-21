// Prefix: api
const SongController = require('../Controllers/SongController.js');

async function getSongInformationApi(req, res) {
  const songUrl = decodeURI(req.params['songUrl']);
  const song = await SongController.addNewSong(songUrl);
  console.log(song);
  res.send(song);
}

export default router => {
  // For demonstration
  router.get('/song/:songUrl', (req, res) => {
    getSongInformationApi(req, res);
  });
};
