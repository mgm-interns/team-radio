var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

var jwt = require('jsonwebtoken');

module.exports = function tokenVerify(req, res, next) {
  console.log('MIDDLEWARE FUNCTION IS RUNNING');

  var token =
    req.body.token || req.param('token') || req.headers['access-token'];

  console.log(token);

  //decode token
  if (token) {
    //verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.',
        });
      } else {
        req.decoded = decoded;
        console.log(decoded.username);
        // next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
};
