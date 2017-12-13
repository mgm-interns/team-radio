import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { execute, subscribe } from 'graphql';
import helmet from 'helmet';
import { createServer } from 'http';
import jwt from 'jsonwebtoken';
import knex from 'knex';
import { Model } from 'objection';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import config from './config';
import knexConfig from './knexfile';
import models from './models';
import schema from './schema';
import formatError from './utils/formatError';
import ValidationError from './utils/ValidationError';

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id, versionKey } = await jwt.verify(token, config.jwtSecret);
    const user = await models.User.query().findById(id);
    const isKeyMatch = user.version_key === versionKey;
    req.user = user && isKeyMatch ? user : null;
    return next();
  } catch (tokenError) {
    if (tokenError.name === 'TokenExpiredError') {
      try {
        const refreshToken = req.headers.refreshtoken;
        const { id, versionKey } = await jwt.verify(
          refreshToken,
          config.jwtRefreshSecret,
        );
        const user = await models.User.query().findById(id);
        const isKeyMatch = user.version_key === versionKey;
        if (isKeyMatch) {
          const tokenPayload = {
            id: user.id,
            versionKey: user.version_key,
          };
          const newToken = jwt.sign(tokenPayload, config.jwtSecret, {
            expiresIn: '2d',
          });
          const newRefreshToken = jwt.sign(
            tokenPayload,
            config.jwtRefreshSecret,
            {
              expiresIn: '7d',
            },
          );
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
};

const start = async () => {
  const app = express();
  app.use(helmet());
  app.use(cors('*'));

  const Knex =
    process.env.NODE_ENV === 'development'
      ? knex(knexConfig.development)
      : knex(knexConfig.production);
  Model.knex(Knex);

  app.use(authenticate);

  app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(req => ({
      context: {
        ValidationError,
        config,
        models,
        user: req.user,
      },
      formatError,
      schema,
    })),
  );

  const PORT = config.port;
  const WS_PORT = config.wsPort;
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://127.0.0.1:65080/subscriptions`,
    }),
  );

  // Create WebSocket listener server
  const websocketServer = createServer((_request, response) => {
    response.writeHead(404);
    response.end();
  });
  // Bind it to port and start listening
  websocketServer.listen(WS_PORT, () => {
    SubscriptionServer.create(
      {
        execute,
        subscribe,
        schema,
        onConnect: () => ({
          models,
        }),
      },
      {
        server: websocketServer,
        path: '/subscriptions',
      },
    );
    // eslint-disable-next-line no-console
    console.log(
      `App's websocket is listening on port ${websocketServer.address().port}`,
    );
  });

  const server = createServer(app);
  return server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App is listening on port ${server.address().port}`);
  });
};

const stop = app => {
  app.close();
};

export default {
  start,
  stop,
};
