import { IAnonymousContext, IAuthenticatedContext } from 'config';
import { Station } from 'entities';
import { BadRequestException } from 'exceptions';
import { RealTimeStation, StationsManager } from 'subscription';
import { Arg, Ctx, Mutation, Publisher, PubSub, Resolver, Root, Subscription } from 'type-graphql';
import { Inject } from 'typedi';
import { BaseStationResolver } from '.';

@Resolver(of => Station)
export class StationResolver extends BaseStationResolver {
  @Inject()
  private stationsManager: StationsManager;

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
