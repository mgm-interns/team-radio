import { GraphQLManager, Context } from 'config';
import { UserRepository } from 'repositories';
import { Logger } from 'services';
import { StationsManager } from 'subscription';
import { Container, Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class SubscriptionManager {
  @Inject()
  private logger: Logger;

  @Inject()
  private realTimeStationManager: StationsManager;

  @InjectRepository()
  private userRepository: UserRepository;

  getOnConnectingHandler() {
    return (headers: SubscriptionHeader): SubscriptionHeader => {
      this.logger.info(`Socket client connecting with headers`, headers);
      // Must return a value to allow the the onDisconnecting handler retrieve this value
      return headers;
    };
  }

  getOnDisconnectingHandler() {
    return async (socket: any, connection: any) => {
      this.logger.info('Socket client disconnecting');
      // Force updating STATIONS if user lost connection with socket
      const tokens: SubscriptionHeader = await connection.initPromise;
      const context = new Context(this.logger, this.userRepository);
      await context.setUserFromTokens(tokens);
      if (context.user) {
        this.realTimeStationManager.leaveAllStation(context.user);
      }
      const graphQLManager = Container.get(GraphQLManager);
      graphQLManager.pubSub.publish('STATIONS', {});
    };
  }
}

interface SubscriptionHeader {
  token?: string;
  refreshToken?: string;
  byPassToken?: string;
  clientId: string;
}
