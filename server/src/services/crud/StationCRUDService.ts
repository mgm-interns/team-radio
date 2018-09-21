import { Service, Container } from 'typedi';
import { StationRepository, SongRepository } from 'repositories';
import { DataAccess } from 'config';
import { BaseCRUDService } from '.';
import { Station } from 'entities';
import { StationNotFoundException, BadRequestException, UnprocessedEntityException } from 'exceptions';
import { StationFilter } from 'types';
import { ObjectId } from 'bson';

@Service()
export class StationCRUDService extends BaseCRUDService {
  public async findOne(id?: string, stationId?: string): Promise<Station> {
    if (id || stationId) {
      let station;
      if (id) station = await this.stationRepository.findOne(id);
      if (stationId) station = await this.stationRepository.findByStationId(stationId);
      if (!station) throw new StationNotFoundException();
      return station;
    }
    throw new BadRequestException('You need to provide id OR stationId');
  }

  public async findAllAndCount(
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
      const condition = this.parseAllCondition(page, perPage, sortField, sortOrder, filter);
      return this.stationRepository.findAndCount({
        ...condition,
        where: {
          ...condition.where,
          ownerId: new ObjectId(ownerId)
        }
      });
    }
    return this.stationRepository.findAndCount({
      ...this.parseAllCondition(page, perPage, sortField, sortOrder, filter)
    });
  }

  public async create(stationName: string, ownerId: string, stationId?: string): Promise<Station> {
    const station = this.stationRepository.create({ stationName, ownerId, stationId });
    if (!stationId) station.generateStationId();
    if (this.stationRepository.findOne({ stationId: station.stationId })) {
      throw new UnprocessedEntityException('Station ID has been taken.');
    }
    return this.stationRepository.saveOrFail(station);
  }

  public async update(id: string, stationName: string, ownerId: string, stationId?: string): Promise<Station> {
    const station = await this.stationRepository.findOneOrFail(id);
    if (stationName) station.stationName = stationName;
    if (ownerId) station.ownerId = ownerId;
    if (stationId) station.stationId = stationId;
    else station.generateStationId();
    return this.stationRepository.saveOrFail(station);
  }

  public async delete(id: string): Promise<Station> {
    const station = await this.stationRepository.findOneOrFail(id);
    await this.stationRepository.remove(station);
    await this.songRepository.delete({ stationId: id });
    return station;
  }

  private get stationRepository(): StationRepository {
    return Container.get(DataAccess).getRepository(StationRepository);
  }

  private get songRepository(): SongRepository {
    return Container.get(DataAccess).getRepository(SongRepository);
  }
}
