import { IAuthenticatedContext } from 'config';
import { Song } from 'entities';
import { NotInStationBadRequestException } from 'exceptions';
import { SongCRUDService } from 'services';
import { RealTimeStationPlayer, RealTimeStationsManager, StationTopic } from 'subscription';
import { Arg, Authorized, Ctx, Mutation, Publisher, PubSub, Query, Resolver, Subscription } from 'type-graphql';
import { Inject } from 'typedi';
import { BaseResolver } from '../BaseResolver';

@Resolver(of => RealTimeStationPlayer)
export class RealTimeStationPlayerResolver extends BaseResolver<RealTimeStationPlayer> {
  @Inject()
  private songCRUDService: SongCRUDService;

  @Inject()
  private manager: RealTimeStationsManager;

  @Authorized()
  @Mutation(returns => Song, { description: 'Add song to a station, required to join a station first.' })
  public async addSong(
    @Arg('url') url: string,
    @Ctx() context: IAuthenticatedContext,
    @PubSub(StationTopic.ADD_PLAYLIST_SONG) publish: Publisher<StationTopic.AddPlaylistSongPayLoad>
  ): Promise<Song> {
    if (!context.currentStation) throw new NotInStationBadRequestException();
    const song = await this.songCRUDService.create(url, context.currentStation.id, context.user.id);
    publish({ song, stationId: context.currentStation.stationId, user: context.user });
    return song;
  }

  @Query(returns => RealTimeStationPlayer, {
    name: 'StationPlayer',
    description:
      'Query station current player state, ' +
      'combine with "onStationPlayerChanged" for fetching initial data then listening for changes.'
  })
  public getPlayer(@Arg('stationId') stationId: string): RealTimeStationPlayer {
    return this.manager.findStation(stationId).player;
  }

  @Subscription(returns => RealTimeStationPlayer, {
    name: 'onStationPlayerChanged',
    topics: [StationTopic.ADD_PLAYLIST_SONG, StationTopic.REMOVE_PLAYLIST_SONG, StationTopic.UPDATE_PLAYER_SONG],
    filter: ({ args, payload }) => payload.stationId === args.stationId,
    description:
      'Subscribe on every change on station player like: add song, remove song, update song, start player, stop player... It is not recommended to use this subscription due to performance issue.',
    deprecationReason: 'This subscription is not good for optimizing app performance.'
  })
  public subscribeStationPlayer(@Arg('stationId') stationId: string): RealTimeStationPlayer {
    return this.manager.findStation(stationId).player;
  }
}
