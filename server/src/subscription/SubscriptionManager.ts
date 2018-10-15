import { Context, IAnonymousContext, IAuthenticatedContext } from 'config';
import { PubSub } from 'graphql-yoga';
import { UserRepository } from 'repositories';
import { Logger } from 'services';
import { Inject, Service, Container } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { RealTimeStationsManager, StationTopic } from './station';

@Service()
export class SubscriptionManager {
  @Inject()
  private logger: Logger;

  @InjectRepository()
  private userRepository: UserRepository;

  private _pubSub = new PubSub();

  public get pubSub() {
    return this._pubSub;
  }

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
        const manager = Container.get(RealTimeStationsManager);
        manager.stations.forEach(station => {
          if (station.isExistedUser(context.user)) {
            if (manager.leaveStation(station.stationId, context.user)) {
              this.pubSub.publish(StationTopic.LEAVE_STATION, {
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
