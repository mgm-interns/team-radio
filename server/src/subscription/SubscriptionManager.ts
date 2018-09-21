import { GraphQLManager, Context, IAuthenticatedContext, IAnonymousContext } from 'config';
import { UserRepository } from 'repositories';
import { Logger } from 'services';
import { StationsManager } from 'subscription';
import { Container, Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { StationTopic } from './station';

@Service()
export class SubscriptionManager {
  @Inject()
  private logger: Logger;

  @Inject()
  private stationsManager: StationsManager;

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
      const context = new Context(this.logger, this.userRepository) as IAuthenticatedContext | IAnonymousContext;
      await context.setUserFromTokens(tokens);
      if (context.user) {
        this.stationsManager.stations.forEach(station => {
          if (station.isExistedUser(context.user)) {
            if (this.stationsManager.leaveStation(station.stationId, context.user)) {
              Container.get(GraphQLManager).pubSub.publish(StationTopic.LEAVE_STATION, {
                stationId: station.stationId,
                user: context.user
              });
            }
          }
        });
      }
    };
  }
}

interface SubscriptionHeader {
  token?: string;
  refreshToken?: string;
  byPassToken?: string;
  clientId: string;
}
