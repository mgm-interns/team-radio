import { UnavailableSong } from 'entities';
import { Logger, UnavailableSongService } from 'services';
import { RealTimeStationsManager } from 'subscription';
import { Arg, Mutation, Query, Resolver, Int } from 'type-graphql';
import { Inject } from 'typedi';
import { BaseResolver } from '../BaseResolver';

@Resolver(of => UnavailableSong)
export class UnavailableSongsResolver extends BaseResolver<UnavailableSong> {
  @Inject()
  protected logger: Logger;

  @Inject()
  private unavailableSongService: UnavailableSongService;

  @Inject()
  private manager: RealTimeStationsManager;

  @Query(returns => Boolean, { name: 'verifySong', description: 'Verify if a song is unavailable or not' })
  public async verifySong(@Arg('url') url: string): Promise<boolean> {
    const result = await this.unavailableSongService.verifySong(url);
    return result.valid;
  }

  @Mutation(returns => Boolean, { name: 'reportUnavailableSong', description: 'Create a song in system.' })
  public async reportUnavailableSong(
    @Arg('url') url: string,
    @Arg('errorCode', type => Int) errorCode: number,
    @Arg('stationId', { nullable: true }) stationId?: string
  ): Promise<boolean> {
    this.logger.info(`Receive a unavailable song report ${url}`);
    const song = await this.unavailableSongService.createUnavailableSong(url, errorCode);
    if (stationId) {
      this.manager.findStation(stationId).removeUnavailableSongFromPlayer(song.url);
    }
    this.logger.info(`Successfully add this song to reported list ${url}`);
    return true;
  }
}
