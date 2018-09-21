import { IAnonymousContext, IAuthenticatedContext } from 'config';
import { Station } from 'entities';
import { BadRequestException } from 'exceptions';
import {
  JoinStationPayLoad,
  LeaveStationPayLoad,
  RealTimeStation,
  RealTimeStationWithOnlineCount,
  StationsManager,
  StationTopic
} from 'subscription';
import { Arg, Ctx, Mutation, Publisher, PubSub, Resolver, Root, Subscription, Query } from 'type-graphql';
import { Inject } from 'typedi';
import { BaseStationResolver } from '.';

@Resolver(of => Station)
export class StationResolver extends BaseStationResolver {
  @Inject()
  private stationsManager: StationsManager;

  @Query(returns => [RealTimeStationWithOnlineCount], {
    name: 'allRealTimeStations',
    description:
      'Query all stations with online users count, ' +
      'combine with "subscribeStations" for fetching initial data then listening for changes.'
  })
  public all(): RealTimeStationWithOnlineCount[] {
    return this.stationsManager.orderedStations.map(RealTimeStationWithOnlineCount.fromRealTimeStation);
  }

  @Subscription(returns => RealTimeStationWithOnlineCount, {
    name: 'onStationsChanged',
    topics: [StationTopic.JOIN_STATION, StationTopic.LEAVE_STATION],
    description: 'Subcribe for online users changes between stations.'
  })
  public subscribeStations(
    @Root() payload: JoinStationPayLoad | LeaveStationPayLoad,
    @Ctx() context: IAuthenticatedContext
  ): RealTimeStationWithOnlineCount {
    return RealTimeStationWithOnlineCount.fromRealTimeStation(this.stationsManager.findStation(payload.stationId));
  }

  @Subscription(returns => RealTimeStation, {
    name: 'onStationChanged',
    topics: [StationTopic.JOIN_STATION, StationTopic.LEAVE_STATION],
    description: 'Subcribe for online users changes between stations.',
    filter: ({ args, payload }) => payload.stationId === args.stationId
  })
  public subscribeStation(
    @Arg('stationId') stationId: string,
    @Root() subscriptionPayload: JoinStationPayLoad | LeaveStationPayLoad,
    @Ctx() context: IAuthenticatedContext
  ): RealTimeStation {
    return this.stationsManager.findStation(stationId);
  }

  @Mutation({ description: 'Join specific station, this action will leave all other stations before joining another.' })
  public joinStation(
    @PubSub(StationTopic.JOIN_STATION) publishJoinStation: Publisher<JoinStationPayLoad>,
    @PubSub(StationTopic.LEAVE_STATION) publishLeaveStation: Publisher<LeaveStationPayLoad>,
    @Arg('stationId') stationId: string,
    @Ctx() context: IAuthenticatedContext | IAnonymousContext
  ): boolean {
    // Leave joined station
    this.stationsManager.stations.forEach(station => {
      if (station.isExistedUser(context.user)) {
        const result = this.stationsManager.leaveStation(station.stationId, context.user);
        if (result) publishLeaveStation({ stationId: station.stationId, user: context.user });
      }
    });
    // Join station
    if (this.stationsManager.joinStation(stationId, context.user)) {
      return publishJoinStation({ stationId, user: context.user });
    }
    throw new BadRequestException('Can not join station');
  }

  @Mutation({ description: 'Leave a specific station.' })
  public leaveStation(
    @PubSub(StationTopic.LEAVE_STATION) publish: Publisher<LeaveStationPayLoad>,
    @Arg('stationId') stationId: string,
    @Ctx() context: IAuthenticatedContext | IAnonymousContext
  ): boolean {
    if (this.stationsManager.leaveStation(stationId, context.user)) {
      return publish({ stationId, user: context.user });
    }
    throw new BadRequestException('Can not leave station');
  }
}
