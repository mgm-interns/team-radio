'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _pubsub = require('../../pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Resolver
 */
exports.default = {
  User: {},
  Subscription: {
    Me: {
      subscribe: () => _pubsub2.default.asyncIterator('Me')
    }
  },
  Query: {
    getAllUsers: (() => {
      var _ref = _asyncToGenerator(function* (root, data, { models: { User }, ValidationError }) {
        try {
          const users = yield User.query();
          return users;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          throw new ValidationError('bad-request');
        }
      });

      return function getAllUsers(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    })(),
    getUserByID: (() => {
      var _ref2 = _asyncToGenerator(function* (root, { userId }, { models: { User }, ValidationError }) {
        try {
          const user = yield User.query().findById(userId);
          if (!user) {
            throw new ValidationError('user-not-found');
          }
          return user;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          if (e.message === 'user-not-found') {
            throw new ValidationError('user-not-found');
          }
          throw new ValidationError('bad-request');
        }
      });

      return function getUserByID(_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    })(),
    me: (root, data, { ValidationError, user }) => {
      if (!user) {
        throw new ValidationError('unauthorized');
      }
      return user;
    }
  },
  Mutation: {
    register: (() => {
      var _ref3 = _asyncToGenerator(function* (root, data, { models: { User }, ValidationError, user }) {
        if (user) {
          throw new ValidationError('still-logging-in');
        }
        Object.assign(data, data, {
          gender: 'unknown'
        });
        try {
          const newUser = yield User.query().insert(data);
          return newUser;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          if (e.code === '23505') {
            throw new ValidationError('email-existed', 'email');
          }
          throw new ValidationError('bad-request');
        }
      });

      return function register(_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      };
    })(),
    login: (() => {
      var _ref4 = _asyncToGenerator(function* (root, { email, password }, { models: { User }, ValidationError, user, config }) {
        if (user) {
          throw new ValidationError('still-logging-in');
        }

        const authUser = yield User.query().findOne({ email });
        if (!authUser) {
          throw new ValidationError('user-not-exists');
        }
        const isPasswordMatch = yield authUser.checkPassword(password);
        if (!isPasswordMatch) {
          throw new ValidationError('wrong-email-or-password');
        }

        const tokenPayload = {
          id: authUser.id,
          versionKey: authUser.version_key
        };
        const token = _jsonwebtoken2.default.sign(tokenPayload, config.jwtSecret, {
          expiresIn: '15m'
        });
        const refreshToken = _jsonwebtoken2.default.sign(tokenPayload, config.jwtRefreshSecret, {
          expiresIn: '7d'
        });
        return {
          token,
          refreshToken
        };
      });

      return function login(_x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
      };
    })(),
    updateMe: (() => {
      var _ref5 = _asyncToGenerator(function* (root, data, { ValidationError, user }) {
        if (!user) {
          throw new ValidationError('unauthorized');
        }
        try {
          const updatedUser = yield user.$query().findById(user.id).patchAndFetch(data);

          _pubsub2.default.publish('Me', {
            Me: updatedUser
          });

          return updatedUser;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          throw new ValidationError('bad-request');
        }
      });

      return function updateMe(_x13, _x14, _x15) {
        return _ref5.apply(this, arguments);
      };
    })(),
    updatePassword: (() => {
      var _ref6 = _asyncToGenerator(function* (root, { oldPassword, newPassword }, { ValidationError, user }) {
        if (!user) {
          throw new ValidationError('unauthorized');
        }

        const oldPasswordMatch = yield user.checkPassword(oldPassword);
        if (!oldPasswordMatch) {
          throw new ValidationError('wrong-password');
        }

        const newPasswordSameOldPassword = yield user.checkPassword(newPassword);
        if (newPasswordSameOldPassword) {
          throw new ValidationError('input-old-password');
        }
        try {
          const updatedUser = yield user.$query().patchAndFetch({ password: newPassword });
          return updatedUser;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          throw new ValidationError('bad-request', 'password');
        }
      });

      return function updatePassword(_x16, _x17, _x18) {
        return _ref6.apply(this, arguments);
      };
    })(),
    deleteUser: (() => {
      var _ref7 = _asyncToGenerator(function* (root, { id }, { models: { User }, ValidationError }) {
        try {
          const user = yield User.query().findById(id);

          if (!user) throw new ValidationError('User not exist');

          yield user.deleteAllRelationship();

          // delete user
          yield User.query().deleteById(id);

          return user;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          throw new ValidationError(e);
        }
      });

      return function deleteUser(_x19, _x20, _x21) {
        return _ref7.apply(this, arguments);
      };
    })()
  }
};