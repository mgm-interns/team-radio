import { IAnonymousContext, IAuthenticatedContext } from 'config';
import { BadRequestException } from 'exceptions';
import { RealTimeStation, RealTimeStationsManager, RealTimeStationWithOnlineCount, StationTopic } from 'subscription';
import { Arg, Ctx, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription } from 'type-graphql';
import { Inject } from 'typedi';
import { BaseStationResolver } from './BaseStationResolver';

@Resolver(of => RealTimeStation)
export class RealTimStationResolver extends BaseStationResolver {
  @Inject()
  private manager: RealTimeStationsManager;

  @Query(returns => RealTimeStation, {
    name: 'RealTimeStation',
    description:
      'Query station with online users count' +
      'combine with "onStationChanged" for fetching initial data then listening for changes.'
  })
  public one(@Arg('stationId') stationId: string): RealTimeStation {
    return RealTimeStation.fromRealTimeStationManager(this.manager.findStation(stationId));
  }

  @Query(returns => [RealTimeStationWithOnlineCount], {
    name: 'allRealTimeStations',
    description:
      'Query all stations with online users count, ' +
      'combine with "onStationsChanged" for fetching initial data then listening for changes.'
  })
  public all(): RealTimeStationWithOnlineCount[] {
    return this.manager.orderedStations.map(RealTimeStationWithOnlineCount.fromRealTimeStation);
  }

  @Subscription(returns => RealTimeStationWithOnlineCount, {
    name: 'onStationsChanged',
    topics: [StationTopic.JOIN_STATION, StationTopic.LEAVE_STATION, StationTopic.UPDATE_PLAYER_SONG],
    description: 'Subscribe for online users changes between stations.'
  })
  public subscribeStations(
    @Root() payload: StationTopic.JoinStationPayLoad | StationTopic.LeaveStationPayLoad
  ): RealTimeStationWithOnlineCount {
    return RealTimeStationWithOnlineCount.fromRealTimeStation(this.manager.findStation(payload.stationId));
  }

  @Subscription(returns => RealTimeStation, {
    name: 'onStationChanged',
    topics: [StationTopic.JOIN_STATION, StationTopic.LEAVE_STATION],
    description: 'Subscribe for station changed, whether user join or leave a station.',
    filter: ({ args, payload }) => payload.stationId === args.stationId
  })
  public subscribeStation(@Arg('stationId') stationId: string): RealTimeStation {
    return RealTimeStation.fromRealTimeStationManager(this.manager.findStation(stationId));
  }

  @Mutation({ description: 'Join specific station, this action will leave all other stations before joining another.' })
  public joinStation(
    @PubSub(StationTopic.JOIN_STATION) publishJoinStation: Publisher<StationTopic.JoinStationPayLoad>,
    @PubSub(StationTopic.LEAVE_STATION) publishLeaveStation: Publisher<StationTopic.LeaveStationPayLoad>,
    @Arg('stationId') stationId: string,
    @Ctx() context: IAuthenticatedContext | IAnonymousContext
  ): boolean {
    let isAlreadyJoinedStation = false;
    // Leave joined station
    this.manager.stations.forEach(station => {
      if (station.isExistedUser(context.user)) {
        if (station.stationId === stationId) {
          // Do nothing if user has been already existed in station
          isAlreadyJoinedStation = true;
        } else {
          const result = this.manager.leaveStation(station.stationId, context.user);
          if (result) {
            const payload: StationTopic.LeaveStationPayLoad = { stationId: station.stationId, user: context.user };
            this.logger.debug(`Publish event ${StationTopic.LEAVE_STATION} with payload:`, payload);
            publishLeaveStation(payload);
          }
        }
      }
    });

    // Do nothing if user has been already existed in station
    if (isAlreadyJoinedStation) {
      return true;
    }
    // Join station
    if (this.manager.joinStation(stationId, context.user)) {
      const payload: StationTopic.JoinStationPayLoad = { stationId, user: context.user };
      this.logger.debug(`Publish event ${StationTopic.JOIN_STATION} with payload:`, payload);
      publishJoinStation(payload);
      return true;
    }
    throw new BadRequestException('Can not join station');
  }

  @Mutation({ description: 'Leave a specific station.' })
  public leaveStation(
    @PubSub(StationTopic.LEAVE_STATION) publish: Publisher<StationTopic.LeaveStationPayLoad>,
    @Arg('stationId') stationId: string,
    @Ctx() context: IAuthenticatedContext | IAnonymousContext
  ): boolean {
    if (this.manager.leaveStation(stationId, context.user)) {
      const payload: StationTopic.LeaveStationPayLoad = { stationId, user: context.user };
      this.logger.debug(`Publish event ${StationTopic.LEAVE_STATION} with payload:`, payload);
      publish(payload);
      return true;
    }
    throw new BadRequestException('Can not leave station');
  }
}
