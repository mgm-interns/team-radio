import { Station } from 'entities';
import { Logger } from 'services';
import { Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { BaseResolver } from '../BaseResolver';

@Resolver(of => Station)
export abstract class BaseStationResolver extends BaseResolver<Station> {
  @Inject()
  protected logger: Logger;
}
