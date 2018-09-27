import { DataAccess, GraphQLManager } from 'config';
import * as Express from 'express';
import { GraphQLServer, Options } from 'graphql-yoga';
import * as Path from 'path';
import { Logger } from 'services';
import { RealTimeStationsManager } from 'subscription/station';
import { SubscriptionManager } from 'subscription';
import { Container } from 'typedi';
import { sleep } from 'utils';
import { WorkersManager } from 'workers';

export async function bootstrap() {
  // Retrieve logger instance
  const logger = Container.get(Logger);

  // Init database connection, this function is HIGH PRIORITY and has to be executed first
  await Container.get(DataAccess).connect();

  // Retrieve GraphQLManager instance
  const graphQLManager = Container.get(GraphQLManager);
  // Retrieve SubscriptionManager instance
  const subscriptionManager = Container.get(SubscriptionManager);

  // Create GraphQL server
  const server = new GraphQLServer({
    schema: await graphQLManager.buildSchemas(),
    context: graphQLManager.getContextHandler()
  });

  const port = parseInt(process.env.PORT as string, 10);
  const apiEndpoint = '/api';
  // Configure server options
  const serverOptions: Options = {
    port,
    endpoint: apiEndpoint,
    playground: apiEndpoint,
    formatError: graphQLManager.getErrorFormatter(),
    subscriptions: {
      path: apiEndpoint,
      onConnect: subscriptionManager.getOnConnectingHandler(),
      onDisconnect: subscriptionManager.getOnDisconnectingHandler()
    }
  };

  // Then initiate real time stations manager
  await Container.get(RealTimeStationsManager).initialize();

  // Start the GraphQL server
  server
    .start(serverOptions, ({ port, playground }) => {
      logger.info(`Server is running, GraphQL Playground available at http://localhost:${port}${playground}`);
    })
    .then(() =>
      Promise.all([
        graphQLManager.initializeGraphQLDocs(port, apiEndpoint),
        async () => {
          // Postpone this task for 5 minutes, to reduce stress to server
          await sleep(1000 * 60 * 5);
          Container.get(WorkersManager).start();
        }
      ])
    )
    .catch(error => {
      logger.error('Error while running the server', error);
      console.error(error);
    });

  // Serve GraphQL documentation
  server.express.use(`${apiEndpoint}/docs`, Express.static(Path.resolve(process.cwd(), 'build', 'docs')));

  // Serve admin
  server.express.use('/admin', Express.static(Path.resolve(process.cwd(), '..', 'admin', 'build')));

  // Serve client
  server.express.use('/', Express.static(Path.resolve(process.cwd(), '..', 'client', 'build')));
}
