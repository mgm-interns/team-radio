import { ObjectId } from 'bson';
import { IAuthenticatedContext } from 'config';
import { Station, UserRole } from 'entities';
import { BadRequestException, StationNotFoundException, UnauthorizedException } from 'exceptions';
import { SongRepository } from 'repositories';
import { CRUDService } from 'services';
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ListMetaData, StationFilter } from 'types';
import { BaseStationResolver } from '.';
import { ICRUDResolver } from '..';

@Resolver(of => Station)
export class StationCRUDResolver extends BaseStationResolver implements ICRUDResolver<Station> {
  @InjectRepository()
  private songRepository: SongRepository;

  @Inject()
  private crudService: CRUDService;

  @Query(returns => Station, { name: 'Station', description: 'Get station by id or stationId' })
  public async one(
    @Arg('id', { nullable: true }) id?: string,
    @Arg('stationId', { nullable: true }) stationId?: string
  ): Promise<Station> {
    if (id || stationId) {
      let station;
      if (id) station = await this.stationRepository.findOne(id);
      if (stationId) station = await this.stationRepository.findByStationId(stationId);
      if (!station) throw new StationNotFoundException();
      return station;
    }
    throw new BadRequestException('You need to provide id OR stationId');
  }

  @Query(returns => [Station], { name: 'allStations', description: 'Get all the stations in system.' })
  public async all(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => StationFilter, { nullable: true }) filter?: StationFilter
  ): Promise<Station[]> {
    const [entities] = await this.findAllAndCount(page, perPage, sortField, sortOrder, filter);
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
    const [entities, total] = await this.findAllAndCount(page, perPage, sortField, sortOrder, filter);
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

  @Authorized([UserRole.STATION_OWNER])
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

  @Authorized([UserRole.STATION_OWNER])
  @Mutation(returns => Station, { name: 'deleteStation', description: 'Delete a station in system.' })
  public async delete(@Arg('id') id: string): Promise<Station> {
    const station = await this.stationRepository.findOneOrFail(id);
    await this.stationRepository.remove(station);
    await this.songRepository.delete({ stationId: id });
    return station;
  }

  private async findAllAndCount(
    page?: number,
    perPage?: number,
    sortField?: string,
    sortOrder?: string,
    filter?: StationFilter
  ): Promise<[Station[], number]> {
    if (filter && filter.ids) {
      const total = filter.ids.length;
      const entities = await Promise.all(filter.ids.map(id => this.stationRepository.findOneOrFail(id)));
      return [entities, total];
    }
    if (filter && (filter.ownerId || filter.owner)) {
      const ownerId = filter.ownerId || (filter.owner && filter.owner.id);
      const condition = this.crudService.parseAllCondition(page, perPage, sortField, sortOrder, filter);
      return this.stationRepository.findAndCount({
        ...condition,
        where: {
          ...condition.where,
          ownerId: new ObjectId(ownerId)
        }
      });
    }
    return this.stationRepository.findAndCount({
      ...this.crudService.parseAllCondition(page, perPage, sortField, sortOrder, filter)
    });
  }
}
