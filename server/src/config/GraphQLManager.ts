import { ContextFunction } from 'apollo-server-core';
import * as Bcrypt from 'bcrypt-nodejs';
import * as ChildProcess from 'child_process';
import { UserRole } from 'entities';
import { Exception, UnauthorizedException, UnprocessedEntityException } from 'exceptions';
import { GraphQLError } from 'graphql';
import { getStatusText, INTERNAL_SERVER_ERROR, UNAUTHORIZED, UNPROCESSABLE_ENTITY } from 'http-status-codes';
import { UserRepository } from 'repositories';
import {
  AuthenticationResolver,
  HistorySongsCRUDResolver,
  PlaylistSongsCRUDResolver,
  RealTimeStationPlayerResolver,
  RealTimeStationPlaylistResolver,
  RealTimStationResolver,
  SongCRUDResolver,
  StationCRUDResolver,
  UserCRUDResolver,
  DistinctSongResolver
} from 'resolvers';
import { Logger } from 'services';
import { SubscriptionManager } from 'subscription';
import { AuthChecker, buildSchema, formatArgumentValidationError } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Context, IAuthenticatedContext, IContext } from './context';

@Service()
export class GraphQLManager {
  @Inject()
  private logger: Logger;

  @InjectRepository()
  private userRepository: UserRepository;

  @Inject()
  private subscriptionManager: SubscriptionManager;

  public async buildSchemas() {
    const schema = await buildSchema({
      authChecker: this.getAuthChecker(),
      pubSub: this.subscriptionManager.pubSub,
      resolvers: [
        // User
        UserCRUDResolver,
        AuthenticationResolver,
        // Station
        StationCRUDResolver,
        RealTimStationResolver,
        // Song
        RealTimeStationPlayerResolver,
        RealTimeStationPlaylistResolver,
        DistinctSongResolver,
        SongCRUDResolver,
        PlaylistSongsCRUDResolver,
        HistorySongsCRUDResolver
      ]
    });

    this.logger.info('Finish loading GraphQL schemas');

    return schema;
  }

  public async initializeGraphQLDocs(port: number, endpoint: string) {
    return new Promise(resolve => {
      const schemaUrl = `http://localhost:${port}${endpoint}`;
      ChildProcess.exec(`npm run docs -- -e ${schemaUrl} -f`, () => {
        this.logger.info('Compiled documentation for GraphQL API');
        resolve();
      });
    });
  }

  public getContextHandler(): ContextFunction {
    return async ({ req, connection, res }) => {
      const context = new Context(this.logger, this.userRepository);
      if (req) {
        const token = req.get('Authorization');
        const refreshToken = req.get('refreshToken');
        const byPassToken = req.get('byPassToken');
        const clientId = req.get('clientId') || GraphQLManager.generateUniqueSocketId();
        const tokens = { token, refreshToken, byPassToken, clientId };
        this.logger.debug('HTTP request info', tokens);
        await context.setUserFromTokens(tokens);
        res.setHeader('clientId', clientId);
      }
      if (connection) {
        const { context: tokens } = connection;
        if (!tokens.clientId) {
          tokens.clientId = GraphQLManager.generateUniqueSocketId();
        }
        this.logger.debug('Web socket connection info', tokens);
        await context.setUserFromTokens(tokens);
      }
      this.logger.debug('Initiated context.');
      return context;
    };
  }

  // TODO: Resolve permission for anonymous
  // or else anonymous can't do anything under @Authorized
  private getAuthChecker(): AuthChecker<IContext> {
    return ({ context, args }, roles) => {
      // there are some roles defined now
      if (!context.user) {
        // and if no user, restrict access
        this.logger.info('User not exist in application context. Access denied!');
        throw new UnauthorizedException('You are not logged in yet!');
      }
      if (roles.length === 0) {
        // if roles doesn't provided, only check user existence in context
        if (context.user.isUser()) {
          return true;
        }
      }
      if (context.user.isUser()) {
        const authenticatedContext = context as IAuthenticatedContext;
        if (roles.includes(UserRole.ADMIN) && authenticatedContext.user.isAdmin()) {
          return true;
        }
        if (
          roles.includes(UserRole.STATION_OWNER) &&
          (authenticatedContext.user.isStationOwner(args['id']) ||
            authenticatedContext.user.isStationOwner(args['stationId']))
        ) {
          return true;
        }
      }
      // no roles matched, restrict access
      throw new UnauthorizedException("You don't have permission for this action");
    };
  }

  public getErrorFormatter() {
    return (error: GraphQLError) => {
      const originalError = error.originalError as Exception;
      const formattedError = formatArgumentValidationError(error);
      const result = {
        ...formattedError,
        ...GraphQLManager.getCustomErrorFields(originalError, formattedError)
      };
      if (Array.isArray(result.validationErrors)) {
        result.validationErrors = result.validationErrors.map(error => ({
          ...error,
          target: undefined
        }));
      }
      return result;
    };
  }

  private static getCustomErrorFields(
    originalError: Exception = new Exception(),
    error: { [key: string]: any }
  ): { [key: string]: any } {
    let statusCode = originalError.statusCode || INTERNAL_SERVER_ERROR;
    let statusCodeText = originalError.statusCodeText || getStatusText(statusCode);
    if (error.validationErrors || (originalError as UnprocessedEntityException).validationErrors) {
      statusCode = UNPROCESSABLE_ENTITY;
      statusCodeText = getStatusText(UNPROCESSABLE_ENTITY);
      return {
        validationErrors: error.validationErrors || (originalError as UnprocessedEntityException).validationErrors,
        statusCode, // tslint:disable-line
        statusCodeText // tslint:disable-line
      };
    }
    // There is no other way other than hard code due to TypeGraphQL is hard code too
    // FIXME: Update when TypeGraphQL change the error message
    if (error.message === 'Access denied! You need to be authorized to perform this action!') {
      statusCode = UNAUTHORIZED;
      statusCodeText = getStatusText(UNAUTHORIZED);
    }
    return { statusCode, statusCodeText };
  }

  private static generateUniqueSocketId() {
    const secret = `${Date.now()}${Math.random()}`;
    return Bcrypt.hashSync(secret, Bcrypt.genSaltSync(1));
  }
}
