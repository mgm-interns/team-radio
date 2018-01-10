import jwt from 'jsonwebtoken';
import User from '../models/user';
import authController from '../controllers/auth';
import * as userController from '../controllers/user';

export default router => {
  router.post('/signup', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ message: 'This email has already been taken.' });
      } else {
        const newUser = await userController.createUser(
          req.body.email,
          req.body.password,
          req.body.name,
        );

        const payload = {
          email: newUser.email,
          name: newUser.name,
          userId: newUser._id,
        };
        const token = jwt.sign(payload, req.app.get('superSecret'), {
          expiresIn: 1440 * 7, // expires in 24 hours
        });
        res.json({
          message: 'signup success',
          token: token,
          userId: newUser._id,
          name: newUser.name,
          avatar_url: newUser.avatar_url,
          username: newUser.username,
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
          const payload = {
            email: user.email,
            name: user.name,
            userId: user._id,
          };

          const token = jwt.sign(payload, req.app.get('superSecret'), {
            expiresIn: 1440,
          });
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            userId: user._id,
            name: user.name,
            avatar_url: user.avatar_url,
            username: user.username,
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
        req.body.name,
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
        username: user.username,
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

  router.post('/isExistUsername', async (req, res) => {
    try {
      const alreadyUser = await User.getUserByUsername(req.body.username);
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

  router.get('/Profile/:username', async (req, res) => {
    try {
      const user = await userController.getUserProfile(req.params.username);
      const token = req.headers['access-token'];
      if (user) {
        // verify token
        if (token) {
          jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
            if (!err && user._id.toString() === decoded.userId) {
              return res.json({
                message: true,
                isOwner: true,
                user: user,
              });
            }
          });
        }
        return res.json({
          message: true,
          isOwner: false,
          user: user,
        });
      }
      return res.json({
        message: 'User not found!',
      });
    } catch (err) {
      throw err;
    }
  });

  router.post('/setAvatar', async (req, res) => {
    try {
      const user = await userController.setAvatar(
        req.body.userId,
        req.body.avatar_url,
      );
      res.json({ user: user });
    } catch (err) {
      throw err;
    }
  });
  router.use(authController);

  // test function *************************************
  router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the coolest API on earth!' });
  });
};
