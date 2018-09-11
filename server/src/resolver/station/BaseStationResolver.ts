import { Station } from 'entities';
import { StationRepository } from 'repositories';
import { BaseResolver } from 'resolver';
import { Logger } from 'services';
import { Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Resolver(of => Station)
export abstract class BaseStationResolver extends BaseResolver<Station> {
  @Inject()
  protected logger: Logger;

  @InjectRepository()
  protected stationRepository: StationRepository;
}
