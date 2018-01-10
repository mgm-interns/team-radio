import jwt from 'jsonwebtoken';
import User from '../models/user';
import authController from '../controllers/auth';
import * as userController from '../controllers/user';

export default router => {
  router.post('/signup', async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ message: 'This email has already been taken.' });
      } else {
        const newUser = new User();
        newUser.email = req.body.email;
        newUser.name = req.body.name;
        newUser.password = newUser.generateHash(req.body.password);

        newUser.save(async err => {
          if (err) throw err;
          const payload = {
            email: newUser.email,
            name: newUser.name,
            userId: newUser._id,
          };

          user = await User.findOne({ email: req.body.email });

          const token = jwt.sign(payload, req.app.get('superSecret'), {
            expiresIn: 1440 * 7, // expires in 24 hours
          });
          res.json({
            message: 'signup success',
            token: token,
            userId: user._id,
            name: user.name,
            avatar_url: user.avatar_url,
          });
        });
      }
    } catch (err) {
      throw err;
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Incorrect email or password',
        });
      } else if (user) {
        if (!user.validPassword(req.body.password)) {
          res.status(401).json({
            success: false,
            message: 'Incorrect email or password',
          });
        } else {
          // if user is found and password is right
          // create a token with only our given payload
          // we don't want to pass in the entrie user since that has the password
          const payload = {
            email: user.email,
            name: user.name,
            userId: user._id,
          };

          const token = jwt.sign(payload, req.app.get('superSecret'), {
            expiresIn: 1440, // expires in 24 hours *****************************
          });
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            userId: user._id,
            name: user.name,
            avatar_url: user.avatar_url,
          });
        }
      }
    } catch (err) {
      throw err;
    }
  });
  router.post('/signupWithSocialAccount', async (req, res) => {
    try {
      const user = await userController.createUserWithSocialAccount(
        req.body.email,
        req.body.googleId,
        req.body.facebookId,
        req.body.avatar_url,
      );
      const payload = {
        email: user.email,
        name: user.name,
        userId: user._id,
      };
      const token = jwt.sign(payload, req.app.get('superSecret'), {
        expiresIn: 1440 * 7, // expires in 24 hours
      });
      res.json({
        message: 'signup success',
        token: token,
        userId: user._id,
        googleId: user.google_id,
        facebookId: user.facebook_id,
        name: user.name,
        avatar_url: user.avatar_url,
      });
    } catch (err) {
      throw err;
    }
  });

  router.post('/isExistUser', async (req, res) => {
    try {
      const alreadyUser = await User.getUserByEmail(req.body.email);
      if (alreadyUser) res.json({ data: { isExist: true } });
      else res.json({ data: { isExist: false } });
    } catch (err) {
      throw err;
    }
  });

  router.post('/isExistName', async (req, res) => {
    try {
      const alreadyUser = await User.getUserByName(req.body.name);
      if (alreadyUser) res.json({ data: { isExist: true } });
      else res.json({ data: { isExist: false } });
    } catch (err) {
      throw err;
    }
  });
  router.post('/verifyToken', async (req, res) => {
    try {
      const token = req.body.token;
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
          if (err) {
            return res.status(400).json({ tokenError: 'Verify token failed.' });
          }
          return res.json(decoded);
        });
      }
      return res.status(400).json({ tokenError: 'No token provided.' });
    } catch (err) {
      throw err;
    }
  });
  //router.use(authController);

  // test function *************************************
  router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the coolest API on earth!' });
  });
};
