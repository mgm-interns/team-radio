import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = function tokenVerify(req, res, next) {
  // get token
  const token = req.headers['access-token'];

  // check token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
      if (err) {
        res.json({
          success: false,
          message: 'Failed to authenticate token.',
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
};
