import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import * as userController from './user';

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = async (req, res, next) => {
  // get token
  const token = req.headers['access-token'];
  const user = await userController.getUserProfile(req.params.username);
  // check token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
      if (!err && user._id.toString() === decoded.userId) {
        next();
      }
    });
  }
};
