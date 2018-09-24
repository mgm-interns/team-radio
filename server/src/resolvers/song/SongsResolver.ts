import { IAuthenticatedContext } from 'config';
import { Song } from 'entities';
import { BadRequestException } from 'exceptions';
import { SongCRUDService } from 'services';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { BaseSongResolver } from '.';

@Resolver(of => Song)
export class SongsResolver extends BaseSongResolver {
  @Inject()
  private songCRUDService: SongCRUDService;

  @Authorized()
  @Mutation(returns => Song, { description: 'Add song to a station, required to join a station first.' })
  public async addSong(@Arg('url') url: string, @Ctx() context: IAuthenticatedContext) {
    if (!context.currentStation) throw new BadRequestException('Required to join a station first');
    this.logger.info('start calling service');
    return this.songCRUDService.create(url, context.currentStation.id, context.user.id);
  }
}
