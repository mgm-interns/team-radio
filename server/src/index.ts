import 'reflect-metadata';
import { GraphQLServer, Options } from 'graphql-yoga';
import { buildSchema } from 'type-graphql';
import { Logger } from 'logger';
import { RecipeResolver } from 'modules/recipes/resolver';
import { NotificationResolver } from 'modules/subscription/resolver';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [RecipeResolver, NotificationResolver]
  });

  // Create GraphQL server
  const server = new GraphQLServer({ schema });

  // Configure server options
  const serverOptions: Options = {
    port: parseInt(process.env.PORT || '8000', 10)
  };

  // Start the server
  server.start(serverOptions, ({ port, playground }) => {
    Logger.info(`Server is running, GraphQL Playground available at http://localhost:${port}${playground}`);
  });
}

bootstrap();
