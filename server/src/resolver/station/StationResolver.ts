import { IAuthenticatedContext } from 'config';
import { Station } from 'entities';
import { StationNotFoundException } from 'exceptions/station';
import { StationRepository } from 'repositories';
import { Logger } from 'services';
import { Arg, Authorized, Ctx, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription } from 'type-graphql';
import { Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { StationSubscription } from 'subscription';

@Resolver(of => Station)
export class StationResolver {
  @Inject()
  private logger: Logger;

  @InjectRepository(Station)
  private stationRepository: StationRepository;

  @Query(returns => [Station], { description: 'Query stations list.' })
  async stations(): Promise<Station[]> {
    return this.stationRepository.find({});
  }

  @Query(returns => Station, { description: 'Query stations by ObjectId.' })
  async stationById(@Arg('id') id: string): Promise<Station> {
    return this.stationRepository.findById(id);
  }

  @Query(returns => Station, { description: 'Query stations by stationId.' })
  async stationByStationId(@Arg('stationId') stationId: string): Promise<Station> {
    const station = await this.stationRepository.findOne({ where: { stationId } });
    if (!station) throw new StationNotFoundException();
    return station;
  }

  @Authorized()
  @Subscription({ topics: 'STATIONS', name: 'stations' })
  stationsSubscription(
    @Root() { stationId }: StationsSubPayload,
    @Ctx() context: IAuthenticatedContext
  ): StationSubscription {
    return {
      stationId,
      date: new Date().getTime(),
      user: context.user
    };
  }

  @Mutation()
  joinStation(
    @PubSub('STATIONS') publish: Publisher<StationsSubPayload>,
    @Arg('stationId') stationId: string
  ): boolean {
    return publish({ stationId });
  }
}

interface StationsSubPayload {
  stationId: string;
}
