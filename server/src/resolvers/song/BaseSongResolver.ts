import { Song } from 'entities';
import { Logger } from 'services';
import { Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { BaseResolver } from '../BaseResolver';

@Resolver(of => Song)
export abstract class BaseSongResolver extends BaseResolver<Song> {
  @Inject()
  protected logger: Logger;
}
