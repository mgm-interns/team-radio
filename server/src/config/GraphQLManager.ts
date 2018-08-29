import { Exception } from 'exceptions';
import { GraphQLError } from 'graphql';
import { ContextCallback } from 'graphql-yoga/dist/types';
import { getStatusText, INTERNAL_SERVER_ERROR, UNAUTHORIZED, UNPROCESSABLE_ENTITY } from 'http-status-codes';
import { UserRepository } from 'repositories';
import { AuthenticationResolver, StationResolver, UserResolver } from 'resolver';
import { Logger } from 'services';
import { AuthChecker, buildSchema, formatArgumentValidationError } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Context, IContext } from '.';

@Service()
export class GraphQLManager {
  @Inject()
  private logger: Logger;

  @InjectRepository()
  private userRepository: UserRepository;

  public async getSchemas() {
    const schema = await buildSchema({
      authChecker: this.getAuthChecker(),
      resolvers: [UserResolver, AuthenticationResolver, StationResolver]
    });

    this.logger.info('Finish loading GraphQL schemas');

    return schema;
  }

  public getContextHandler(): ContextCallback {
    return async params => {
      const context: Context = new Context(this.logger, this.userRepository);
      if (params.request) {
        const { request } = params;
        const token = request.get('authorization');
        const refreshToken = request.get('refreshToken');
        const byPassToken = request.get('byPassToken');
        const tokens = { token, refreshToken, byPassToken };
        this.logger.info('HTTP request info', tokens);
        await context.setUserFromTokens(tokens);
      }
      if (params.connection) {
        const {
          connection: { context: tokens }
        } = params;
        this.logger.info('Web socket connection info', tokens);
        await context.setUserFromTokens(tokens);
      }
      this.logger.info('Initiated context.');
      return context;
    };
  }

  private getAuthChecker(): AuthChecker<IContext> {
    return ({ context }, roles) => {
      if (roles.length === 0) {
        // if `@Authorized()`, check only is user exist
        return !!context.user;
      }
      // there are some roles defined now
      if (!context.user) {
        // and if no user, restrict access
        this.logger.info('User not exist in application context. Access denied!');
        return false;
      }
      // TODO: User roles & permissions
      // if (user.roles.some(role => roles.includes(role))) {
      //   // grant access if the roles overlap
      //   return true;
      // }

      // no roles matched, restrict access
      return false;
    };
  }

  public getErrorFormatter() {
    return (error: GraphQLError) => {
      const originalError = error.originalError as Exception;
      const formattedError = formatArgumentValidationError(error);
      return {
        ...formattedError,
        ...GraphQLManager.getCustomErrorFields(originalError, formattedError)
      };
    };
  }

  private static getCustomErrorFields(originalError: Exception, error: { [key: string]: any }): { [key: string]: any } {
    let statusCode = originalError.statusCode || INTERNAL_SERVER_ERROR;
    let statusCodeText = originalError.statusCodeText || getStatusText(INTERNAL_SERVER_ERROR);
    if (error.validationErrors) {
      statusCode = UNPROCESSABLE_ENTITY;
      statusCodeText = getStatusText(UNPROCESSABLE_ENTITY);
    }
    // There is no other way other than hard code due to TypeGraphQL is hard code too
    // FIXME: Update when TypeGraphQL change the error message
    if (error.message === 'Access denied! You need to be authorized to perform this action!') {
      statusCode = UNAUTHORIZED;
      statusCodeText = getStatusText(UNAUTHORIZED);
    }
    return { statusCode, statusCodeText };
  }
}