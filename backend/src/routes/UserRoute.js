import jwt from 'jsonwebtoken';
import User from '../models/User';
import authController from '../controllers/auth';

export default router => {
  router.post('/signup', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        res.json({ message: 'Email is not available' });
      } else {
        const newUser = new User();
        newUser.email = req.body.email;
        newUser.name = req.body.name;
        newUser.password = newUser.generateHash(req.body.password);

        newUser.save(function(err) {
          if (err) throw err;
          const payload = {
            email: newUser.email,
            name: newUser.name,
          };

          const token = jwt.sign(payload, req.app.get('superSecret'), {
            expiresIn: 1440 * 7, // expires in 24 hours
          });
          res.json({
            message: 'signup success',
            token: token,
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
        res.json({
          success: false,
          message: 'Authenticate failed. User not Found.',
        });
      } else if (user) {
        if (!user.validPassword(req.body.password)) {
          res.json({
            message: 'Authenticate failed. Wrong password.',
            success: false,
          });
        } else {
          // if user is found and password is right
          // create a token with only our given payload
          // we don't want to pass in the entrie user since that has the password=
          const payload = {
            email: user.email,
            name: user.name,
          };

          const token = jwt.sign(payload, req.app.get('superSecret'), {
            expiresIn: 1440, // expires in 24 hours *****************************
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
          });
        }
      }
    } catch (err) {
      throw err;
    }
  });

  router.use((req, res, next) => {
    authController(req, res, next);
  });

  // test function *************************************
  router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the coolest API on earth!' });
  });

  router.get('/User', (req, res) => {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });
};
