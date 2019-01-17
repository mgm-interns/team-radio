import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import * as Path from 'path';
import { Logger } from 'services';
import { SubscriptionManager } from 'subscription';
import { RealTimeStationsManager } from 'subscription/station';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { Container } from 'typedi';
import { sleep } from 'utils';
import { WorkersManager } from 'workers';
import { DataAccess } from './DataAccess';
import { GraphQLManager } from './GraphQLManager';

export async function bootstrap() {
  // Retrieve logger instance
  const logger = Container.get(Logger);

  // Init database connection, this function is HIGH PRIORITY and has to be executed first
  await Container.get(DataAccess).connect();

  // Retrieve GraphQLManager instance
  const graphQLManager = Container.get(GraphQLManager);
  // Retrieve SubscriptionManager instance
  const subscriptionManager = Container.get(SubscriptionManager);

  const port = parseInt(process.env.PORT as string, 10);
  const endpoint = '/api';

  const express = Express();

  const schema = await graphQLManager.buildSchemas();

  // Create GraphQL server
  const apolloServer = new ApolloServer({
    schema,
    context: graphQLManager.getContextHandler(),
    playground: true,
    introspection: true,
    formatError: graphQLManager.getErrorFormatter(),
    subscriptions: false // Disable subscription config in apollo server due unknow bug
  });

  // Serve GraphQL documentation site
  express.use(`${endpoint}/docs`, Express.static(Path.resolve(process.cwd(), 'build', 'docs')));

  // Serve GraphQL API by applying apollo server to express instance
  apolloServer.applyMiddleware({ app: express, path: endpoint });

  // Serve admin site
  express.use('/admin', Express.static(Path.resolve(process.cwd(), '..', 'admin', 'build')));

  // Serve client site
  express.use('/', Express.static(Path.resolve(process.cwd(), '..', 'client', 'build')));

  // Then initiate real time stations manager
  await Container.get(RealTimeStationsManager).initialize();

  const httpServer = createServer(express);

  httpServer.listen({ port }, () => {
    logger.info(`Apollo Server on http://localhost:${port}/${endpoint}`);
    // Initialize subscription server after initializing http server
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
        onConnect: subscriptionManager.getOnConnectingHandler(),
        onDisconnect: subscriptionManager.getOnDisconnectingHandler(),
        // This is a fix for Heroku deployment
        keepAlive: parseInt(process.env.WEBSOCKET_KEEP_ALIVE_INTERVAL || '20000', 10)
      },
      { server: httpServer, path: endpoint }
    );
    // Start the GraphQL server
    Promise.all([
      graphQLManager.initializeGraphQLDocs(port, endpoint),
      async () => {
        // Postpone this task for 5 minutes, to reduce stress to server
        await sleep(1000 * 60 * 5);
        Container.get(WorkersManager).start();
      }
    ]);
  });
}
