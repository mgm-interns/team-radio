import { Station } from 'entities';
import { BaseResolver } from 'resolvers';
import { Logger } from 'services';
import { Resolver } from 'type-graphql';
import { Inject } from 'typedi';

@Resolver(of => Station)
export abstract class BaseStationResolver extends BaseResolver<Station> {
  @Inject()
  protected logger: Logger;
}
