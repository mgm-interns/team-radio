import { IAnonymousContext, IAuthenticatedContext } from 'config';
import { Station } from 'entities';
import { BadRequestException, StationNotFoundException } from 'exceptions';
import { StationRepository } from 'repositories';
import { Logger } from 'services';
import { RealTimeStation, StationsManager } from 'subscription';
import { Arg, Ctx, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription } from 'type-graphql';
import { Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseResolver } from '..';

@Resolver(of => Station)
export class StationResolver extends BaseResolver {
  @Inject()
  private logger: Logger;

  @Inject()
  private stationsManager: StationsManager;

  @InjectRepository()
  private stationRepository: StationRepository;

  @Query(returns => [Station], { description: 'Query stations list.' })
  public async stations(): Promise<Station[]> {
    return this.stationRepository.find({});
  }

  @Query(returns => Station, { description: 'Query stations by id.' })
  public async stationById(@Arg('id') id: string): Promise<Station> {
    return this.stationRepository.findById(id);
  }

  @Query(returns => Station, { description: 'Query stations by stationId.' })
  public async stationByStationId(@Arg('stationId') stationId: string): Promise<Station> {
    const station = await this.stationRepository.findOne({ where: { stationId } });
    if (!station) throw new StationNotFoundException();
    return station;
  }

  @Subscription(returns => [RealTimeStation], { topics: 'STATIONS', name: 'stations' })
  public subscribeStations(@Root() subscriptionPayload: any, @Ctx() context: IAuthenticatedContext): RealTimeStation[] {
    return this.stationsManager.orderedStations;
  }

  @Mutation()
  public joinStation(
    @PubSub('STATIONS') publish: Publisher<any>,
    @Arg('stationId') stationId: string,
    @Ctx() context: IAuthenticatedContext | IAnonymousContext
  ): boolean {
    if (this.stationsManager.joinStation(stationId, context.user)) {
      return publish({});
    }
    throw new BadRequestException('Can not join station');
  }

  @Mutation()
  public leaveStation(
    @PubSub('STATIONS') publish: Publisher<any>,
    @Arg('stationId') stationId: string,
    @Ctx() context: IAuthenticatedContext | IAnonymousContext
  ): boolean {
    if (this.stationsManager.leaveStation(stationId, context.user)) {
      return publish({});
    }
    throw new BadRequestException('Can not leave station');
  }
}
