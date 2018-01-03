import jwt from 'jsonwebtoken';
import User from '../models/User';
import authController from '../controllers/auth';

export default router => {
  router.post('/signup', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ message: 'This email has already been taken.' });
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

  router.use(authController);

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
