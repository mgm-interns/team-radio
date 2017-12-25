// Prefix: api
const bodyParser = require('body-parser');

export default router => {
  // Create example socket testpage

  router.get('/teststations', function(req, res) {
    console.log('"Test station detail socket page"');
    // res.send('Noi Dung');
    res.sendFile(__dirname + '/' + 'StationDetailPage.html');
  });
};
