import { Song } from 'entities';
import { SongRepository, StationRepository } from 'repositories';
import { BaseResolver } from 'resolver';
import { Logger } from 'services';
import { Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Resolver(of => Song)
export abstract class BaseSongResolver extends BaseResolver<Song> {
  @Inject()
  protected logger: Logger;

  @InjectRepository()
  protected songRepository: SongRepository;

  @InjectRepository()
  protected stationRepository: StationRepository;
}
