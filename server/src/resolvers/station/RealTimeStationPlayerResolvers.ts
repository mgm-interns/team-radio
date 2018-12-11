import { RealTimeStationPlayer, RealTimeStationsManager, StationTopic } from 'subscription';
import { Arg, Query, Resolver, Subscription } from 'type-graphql';
import { Inject } from 'typedi';
import { BaseResolver } from '../BaseResolver';

@Resolver(of => RealTimeStationPlayer)
export class RealTimeStationPlayerResolver extends BaseResolver<RealTimeStationPlayer> {
  @Inject()
  private manager: RealTimeStationsManager;

  @Query(returns => RealTimeStationPlayer, {
    name: 'StationPlayer',
    description:
      'Query station current player state, ' +
      'combine with "onStationPlayerChanged" for fetching initial data then listening for changes.'
  })
  public getPlayer(@Arg('stationId') stationId: string): RealTimeStationPlayer {
    return RealTimeStationPlayer.fromRealTimeStationPlayerManager(this.manager.findStation(stationId).player);
  }

  @Subscription(returns => RealTimeStationPlayer, {
    name: 'onStationPlayerChanged',
    topics: [StationTopic.UPDATE_PLAYER_SONG],
    filter: ({ args, payload }) => payload.stationId === args.stationId,
    description: 'Subscribe on update player song player event of station player manager'
  })
  public subscribeStationPlayer(@Arg('stationId') stationId: string): RealTimeStationPlayer {
    return RealTimeStationPlayer.fromRealTimeStationPlayerManager(this.manager.findStation(stationId).player);
  }
}
