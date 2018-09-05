import { DataAccess, GraphQLManager } from 'config';
import { GraphQLServer, Options } from 'graphql-yoga';
import { Logger } from 'services';
import { StationsManager, SubscriptionManager } from 'subscription';
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
    schema: await graphQLManager.getSchemas(),
    context: graphQLManager.getContextHandler()
  });

  // Configure server options
  const serverOptions: Options = {
    port: parseInt(process.env.PORT as string, 10),
    endpoint: '/api',
    playground: '/api',
    formatError: graphQLManager.getErrorFormatter(),
    subscriptions: {
      path: '/api',
      onConnect: subscriptionManager.getOnConnectingHandler(),
      onDisconnect: subscriptionManager.getOnDisconnectingHandler()
    }
  };

  // Start the GraphQL server
  server
    .start(serverOptions, ({ port, playground }) => {
      logger.info(`Server is running, GraphQL Playground available at http://localhost:${port}${playground}`);
    })
    .then(async () => {
      await Promise.all([Container.get(StationsManager).initialize()]);

      // Postpone this task for 5 minutes, to reduce stress to server
      await sleep(1000 * 60 * 5);
      Container.get(WorkersManager).start();
    })
    .catch(error => {
      logger.error('Error while running the server', error);
    });
}
