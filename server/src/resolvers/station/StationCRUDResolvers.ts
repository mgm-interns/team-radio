import { Station, UserRole } from 'entities';
import { StationCRUDService } from 'services';
import { Arg, Authorized, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { ListMetaData, StationFilter } from 'types';
import { BaseStationResolver } from './BaseStationResolver';
import { ICRUDResolver } from '../ICRUDResolver';

@Resolver(of => Station)
export class StationCRUDResolver extends BaseStationResolver implements ICRUDResolver<Station> {
  @Inject()
  private stationCRUDService: StationCRUDService;

  @Query(returns => Station, { name: 'Station', description: 'Get station by id or stationId' })
  public async one(
    @Arg('id', { nullable: true }) id?: string,
    @Arg('stationId', { nullable: true }) stationId?: string
  ): Promise<Station> {
    return this.stationCRUDService.findOne(id);
  }

  @Query(returns => [Station], { name: 'allStations', description: 'Get all the stations in system.' })
  public async all(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => StationFilter, { nullable: true }) filter?: StationFilter
  ): Promise<Station[]> {
    const [entities] = await this.stationCRUDService.findAllAndCount(page, perPage, sortField, sortOrder, filter);
    return entities;
  }

  @Query(returns => ListMetaData, { name: '_allStationsMeta', description: 'Get meta for all the stations in system.' })
  public async meta(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => StationFilter, { nullable: true }) filter?: StationFilter
  ): Promise<ListMetaData> {
    const [entities, total] = await this.stationCRUDService.findAllAndCount(
      page,
      perPage,
      sortField,
      sortOrder,
      filter
    );
    return new ListMetaData(total);
  }

  @Authorized()
  @Mutation(returns => Station, { name: 'createStation', description: 'Create a station in system.' })
  public async create(
    @Arg('stationName') stationName: string,
    @Arg('ownerId') ownerId: string,
    @Arg('stationId', { nullable: true }) stationId?: string
  ): Promise<Station> {
    return this.stationCRUDService.create(stationName, ownerId, stationId);
  }

  @Authorized([UserRole.STATION_OWNER])
  @Mutation(returns => Station, { name: 'updateStation', description: 'Update a station in system.' })
  public async update(
    @Arg('id') id: string,
    @Arg('stationName', { nullable: true }) stationName: string,
    @Arg('ownerId', { nullable: true }) ownerId: string,
    @Arg('stationId', { nullable: true }) stationId?: string
  ): Promise<Station> {
    return this.stationCRUDService.update(id, stationName, ownerId, stationId);
  }

  @Authorized([UserRole.STATION_OWNER])
  @Mutation(returns => Station, { name: 'deleteStation', description: 'Delete a station in system.' })
  public async delete(@Arg('id') id: string): Promise<Station> {
    return this.stationCRUDService.delete(id);
  }
}
