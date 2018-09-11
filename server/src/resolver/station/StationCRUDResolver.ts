import { Station } from 'entities';
import { BadRequestException, StationNotFoundException } from 'exceptions';
import { CRUDService } from 'services';
import { Arg, Authorized, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { ListMetaData, StationFilter } from 'types';
import { BaseStationResolver } from '.';
import { ICRUDResolver } from '..';

@Resolver(of => Station)
export class StationCRUDResolver extends BaseStationResolver implements ICRUDResolver<Station> {
  @Inject()
  private crudService: CRUDService;

  @Query(returns => Station, { name: 'Station', description: 'Get user by id' })
  public async one(
    @Arg('id', { nullable: true }) id?: string,
    @Arg('stationId', { nullable: true }) stationId?: string
  ): Promise<Station> {
    if (id || stationId) {
      let user;
      if (id) user = await this.stationRepository.findOne(id);
      if (stationId) user = await this.stationRepository.findByStationId(stationId);
      if (!user) throw new StationNotFoundException();
      return user;
    }
    throw new BadRequestException('You need to provide id OR stationId');
  }

  @Authorized()
  @Query(returns => [Station], { name: 'allStations', description: 'Get all the stations in system.' })
  public async all(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => StationFilter, { nullable: true }) filter?: StationFilter
  ): Promise<Station[]> {
    if (filter && filter.ids) {
      return Promise.all(filter.ids.map(id => this.stationRepository.findOneOrFail(id)));
    }
    if (filter && filter.ownerId) {
      const condition = this.crudService.parseAllCondition(page, perPage, sortField, sortOrder, filter);
      return this.stationRepository.find({
        ...condition,
        where: {
          ...condition.where,
          ownerId: filter.ownerId
        }
      });
    }
    return this.stationRepository.find({
      ...this.crudService.parseAllCondition(page, perPage, sortField, sortOrder, filter)
    });
  }

  // TODO: Solve .count function
  @Authorized()
  @Query(returns => ListMetaData, { name: '_allStationsMeta', description: 'Get all the stations in system.' })
  public async meta(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => StationFilter, { nullable: true }) filter?: StationFilter
  ): Promise<ListMetaData> {
    const [stations, total] = await this.stationRepository.findAndCount({
      ...this.crudService.parseAllCondition(page, perPage, sortField, sortOrder, filter)
    });
    return new ListMetaData(total);
  }

  @Authorized()
  @Mutation(returns => Station, { name: 'createStation', description: 'Create a station in system.' })
  public async create(
    @Arg('stationName') stationName: string,
    @Arg('ownerId') ownerId: string,
    @Arg('stationId', { nullable: true }) stationId?: string
  ): Promise<Station> {
    const station = this.stationRepository.create({ stationName, ownerId, stationId });
    this.logger.info('station', station);
    if (!stationId) station.generateStationId();
    this.logger.info('station', station);
    return this.stationRepository.saveOrFail(station);
  }

  @Authorized()
  @Mutation(returns => Station, { name: 'updateStation', description: 'Update a station in system.' })
  public async update(
    @Arg('id') id: string,
    @Arg('stationName', { nullable: true }) stationName: string,
    @Arg('ownerId', { nullable: true }) ownerId: string,
    @Arg('stationId', { nullable: true }) stationId?: string
  ): Promise<Station> {
    const station = await this.stationRepository.findOneOrFail(id);
    if (stationName) station.stationName = stationName;
    if (ownerId) station.ownerId = ownerId;
    if (stationId) station.stationId = stationId;
    else station.generateStationId();
    return this.stationRepository.saveOrFail(station);
  }

  @Authorized()
  @Mutation(returns => Station, { name: 'deleteStation', description: 'Delete a station in system.' })
  public async delete(@Arg('id') id: string): Promise<Station> {
    const station = await this.stationRepository.findOneOrFail(id);
    await this.stationRepository.remove(station);
    return station;
  }
}
