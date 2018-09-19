import { Song } from 'entities';
import { BaseResolver } from 'resolvers';
import { Logger } from 'services';
import { Resolver } from 'type-graphql';
import { Inject } from 'typedi';

@Resolver(of => Song)
export abstract class BaseSongResolver extends BaseResolver<Song> {
  @Inject()
  protected logger: Logger;
}
