import { IAnonymousContext, IAuthenticatedContext } from 'config';
import { BadRequestException } from 'exceptions';
import {
  JoinStationPayLoad,
  LeaveStationPayLoad,
  RealTimeStation,
  RealTimeStationPlayer,
  RealTimeStationsManager,
  RealTimeStationWithOnlineCount,
  StationTopic
} from 'subscription';
import { Arg, Ctx, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription } from 'type-graphql';
import { Inject } from 'typedi';
import { BaseStationResolver } from '.';

@Resolver(of => RealTimeStation)
export class RealTimStationResolver extends BaseStationResolver {
  @Inject()
  private manager: RealTimeStationsManager;

  @Query(returns => RealTimeStation, {
    name: 'RealTimeStation',
    description: 'Query station with online users count'
  })
  public one(@Arg('stationId') stationId: string): RealTimeStation {
    return this.manager.findStation(stationId);
  }

  @Query(returns => [RealTimeStationWithOnlineCount], {
    name: 'allRealTimeStations',
    description:
      'Query all stations with online users count, ' +
      'combine with "subscribeStations" for fetching initial data then listening for changes.'
  })
  public all(): RealTimeStationWithOnlineCount[] {
    return this.manager.orderedStations.map(RealTimeStationWithOnlineCount.fromRealTimeStation);
  }

  @Subscription(returns => RealTimeStationWithOnlineCount, {
    name: 'onStationsChanged',
    topics: [StationTopic.JOIN_STATION, StationTopic.LEAVE_STATION],
    description: 'Subscribe for online users changes between stations.'
  })
  public subscribeStations(
    @Root() payload: JoinStationPayLoad | LeaveStationPayLoad,
    @Ctx() context: IAuthenticatedContext
  ): RealTimeStationWithOnlineCount {
    return RealTimeStationWithOnlineCount.fromRealTimeStation(this.manager.findStation(payload.stationId));
  }

  @Subscription(returns => RealTimeStation, {
    name: 'onStationChanged',
    topics: [StationTopic.JOIN_STATION, StationTopic.LEAVE_STATION],
    description: 'Subscribe for online users changes between stations.',
    filter: ({ args, payload }) => payload.stationId === args.stationId
  })
  public subscribeStation(@Arg('stationId') stationId: string): RealTimeStation {
    return this.manager.findStation(stationId);
  }

  @Query(returns => RealTimeStationPlayer, { name: 'StationPlayer' })
  public getPlayer(@Arg('stationId') stationId: string): RealTimeStationPlayer {
    return this.manager.findStation(stationId).player;
  }

  @Subscription(returns => RealTimeStationPlayer, {
    name: 'onStationPlayerChanged',
    topics: [StationTopic.ADD_SONG] // TODO: Add other action
  })
  public subscribeStationPlayer(@Arg('stationId') stationId: string): RealTimeStationPlayer {
    return this.manager.findStation(stationId).player;
  }

  @Mutation({ description: 'Join specific station, this action will leave all other stations before joining another.' })
  public joinStation(
    @PubSub(StationTopic.JOIN_STATION) publishJoinStation: Publisher<JoinStationPayLoad>,
    @PubSub(StationTopic.LEAVE_STATION) publishLeaveStation: Publisher<LeaveStationPayLoad>,
    @Arg('stationId') stationId: string,
    @Ctx() context: IAuthenticatedContext | IAnonymousContext
  ): boolean {
    // Leave joined station
    this.manager.stations.forEach(station => {
      if (station.isExistedUser(context.user)) {
        const result = this.manager.leaveStation(station.stationId, context.user);
        if (result) publishLeaveStation({ stationId: station.stationId, user: context.user });
      }
    });
    // Join station
    if (this.manager.joinStation(stationId, context.user)) {
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
    if (this.manager.leaveStation(stationId, context.user)) {
      return publish({ stationId, user: context.user });
    }
    throw new BadRequestException('Can not leave station');
  }
}
