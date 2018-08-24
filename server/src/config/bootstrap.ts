import { DataAccess, GraphQLManager } from 'config';
import { GraphQLServer, Options } from 'graphql-yoga';
import { Logger } from 'services';
import { SubscriptionManager } from 'subscription';
import { Container } from 'typedi';
import { sleep } from 'utils';

export async function bootstrap() {
  // Retrieve logger instance
  const logger = Container.get(Logger);

  // Retrieve DataAccess instance
  const dataAccess = Container.get(DataAccess);
  // Init database connection, this function is HIGH PRIORITY and has to be executed first
  await dataAccess.connect();

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
    formatError: graphQLManager.getErrorFormatter(),
    subscriptions: {
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
      // Postpone this task for 5 minutes, to reduce stress to server
      await sleep(1000 * 2);
      dataAccess.startWorkers();
    })
    .catch(error => {
      logger.error('Error while running the server', error);
    });
}
