var express = require('express');
var app = express();
var apiRoutes = express.Router();
var User = require('../Models/User');
var jwt = require('jsonwebtoken');
var AuthController = require('../Controllers/AuthController');

export default router => {
  router.post('/signup', function(req, res, done) {
    User.findOne({ 'local.email': req.body.email }, function(err, user) {
      //if there are any error
      if (err) return done(err);

      //if username is already exist
      if (user) {
        res.json({ message: 'Email is not available' });
      } else {
        console.log('EMAIL : ');
        console.log(req.body.email);

        var newUser = new User();
        newUser.local.email = req.body.email;
        newUser.local.username = req.body.username;
        newUser.local.password = newUser.generateHash(req.body.password);

        newUser.save(function(err) {
          if (err) throw err;
          const payload = {
            email: newUser.local.email,
            username: newUser.local.username,
          };

          var token = jwt.sign(payload, req.app.get('superSecret'), {
            expiresIn: 1440 * 7, //expires in 24 hours *****************************
          });
          res.json({
            message: 'signup success',
            token: token,
          });
        });
      }
    });
  });

  router.post('/login', function(req, res) {
    User.findOne({ 'local.email': req.body.email }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          message: 'Authenticate failed. User not Found.',
        });
      } else if (user) {
        //check if password correct
        if (!user.validPassword(req.body.password)) {
          res.json({
            success: false,
            message: 'Authenticate failed. Wrong password.',
          });
        } else {
          //if user is found and password is right
          //create a token with only our given payload
          //we don't want to pass in the entrie user since that has the password
          const payload = {
            email: user.local.email,
            username: user.local.username,
          };

          var token = jwt.sign(payload, req.app.get('superSecret'), {
            expiresIn: 1440 * 7, //expires in 24 hours *****************************
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
          });
        }
      }
    });
  });

  router.use(function(req, res, next) {
    console.log('MIDDLEWARE IS INVOKED');
    AuthController(req, res, next);
    next();
  });

  //test function *************************************
  router.get('/', function(req, res, next) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
  });

  router.get('/User', function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });
};
