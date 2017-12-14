'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloServerExpress = require('apollo-server-express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _graphql = require('graphql');

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _http = require('http');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

var _objection = require('objection');

var _subscriptionsTransportWs = require('subscriptions-transport-ws');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _knexfile = require('./knexfile');

var _knexfile2 = _interopRequireDefault(_knexfile);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _formatError = require('./utils/formatError');

var _formatError2 = _interopRequireDefault(_formatError);

var _ValidationError = require('./utils/ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const authenticate = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const token = req.headers.authorization;
      const { id, versionKey } = yield _jsonwebtoken2.default.verify(token, _config2.default.jwtSecret);
      const user = yield _models2.default.User.query().findById(id);
      const isKeyMatch = user.version_key === versionKey;
      req.user = user && isKeyMatch ? user : null;
      return next();
    } catch (tokenError) {
      if (tokenError.name === 'TokenExpiredError') {
        try {
          const refreshToken = req.headers.refreshtoken;
          const { id, versionKey } = yield _jsonwebtoken2.default.verify(refreshToken, _config2.default.jwtRefreshSecret);
          const user = yield _models2.default.User.query().findById(id);
          const isKeyMatch = user.version_key === versionKey;
          if (isKeyMatch) {
            const tokenPayload = {
              id: user.id,
              versionKey: user.version_key
            };
            const newToken = _jsonwebtoken2.default.sign(tokenPayload, _config2.default.jwtSecret, {
              expiresIn: '2d'
            });
            const newRefreshToken = _jsonwebtoken2.default.sign(tokenPayload, _config2.default.jwtRefreshSecret, {
              expiresIn: '7d'
            });
            req.user = user;
            res.set('Access-Control-Expose-Headers', 'X-Token, X-Refresh-Token');
            res.set('X-Token', newToken);
            res.set('X-Refresh-Token', newRefreshToken);
            return next();
          }
          return next();
        } catch (refreshTokenError) {
          return next();
        }
      }
      return next();
    }
  });

  return function authenticate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

const start = (() => {
  var _ref2 = _asyncToGenerator(function* () {
    const app = (0, _express2.default)();
    app.use((0, _helmet2.default)());
    app.use((0, _cors2.default)('*'));

    const Knex = (process && process.env && process.env.NODE_ENV || 'development') === 'development' ? (0, _knex2.default)(_knexfile2.default.development) : (0, _knex2.default)(_knexfile2.default.production);
    _objection.Model.knex(Knex);

    app.use(authenticate);

    app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)(function (req) {
      return {
        context: {
          ValidationError: _ValidationError2.default,
          config: _config2.default,
          models: _models2.default,
          user: req.user
        },
        formatError: _formatError2.default,
        schema: _schema2.default
      };
    }));

    const PORT = _config2.default.port;
    const WS_PORT = _config2.default.wsPort;
    app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://127.0.0.1:65080/subscriptions`
    }));

    // Create WebSocket listener server
    const websocketServer = (0, _http.createServer)(function (_request, response) {
      response.writeHead(404);
      response.end();
    });
    // Bind it to port and start listening
    websocketServer.listen(WS_PORT, function () {
      _subscriptionsTransportWs.SubscriptionServer.create({
        execute: _graphql.execute,
        subscribe: _graphql.subscribe,
        schema: _schema2.default,
        onConnect: function () {
          return {
            models: _models2.default
          };
        }
      }, {
        server: websocketServer,
        path: '/subscriptions'
      });
      // eslint-disable-next-line no-console
      console.log(`App's websocket is listening on port ${websocketServer.address().port}`);
    });

    const server = (0, _http.createServer)(app);
    return server.listen(PORT, function () {
      // eslint-disable-next-line no-console
      console.log(`App is listening on port ${server.address().port}`);
    });
  });

  return function start() {
    return _ref2.apply(this, arguments);
  };
})();

const stop = app => {
  app.close();
};

exports.default = {
  start,
  stop
};