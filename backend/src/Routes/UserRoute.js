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
        res.status(400).json({ email: 'This email has already been taken.' });
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
            data: {
              message: 'signup success',
              token: token,
            },
          });
        });
      }
    });
  });

  router.post('/login', function(req, res) {
    User.findOne({ 'local.email': req.body.email }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Sorry, we could not find an account with that email.',
        });
      } else if (user) {
        //check if password correct
        if (!user.validPassword(req.body.password)) {
          res.status(401).json({
            success: false,
            message: 'The password is incorrect.',
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
            data: {
              success: true,
              message: 'Enjoy your token!',
              token: token,
            }
          });
        }
      }
    });
  });

  router.use(AuthController);

  //test function *************************************
  router.get('/', function(req, res, next) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
  });

  router.get('/users', function(req, res, next) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });
};
