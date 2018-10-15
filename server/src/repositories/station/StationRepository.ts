import { Station } from 'entities';
import { StationNotFoundException } from 'exceptions';
import { Logger } from 'services';
import { Inject, Service } from 'typedi';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../BaseRepository';

@Service()
@EntityRepository(Station)
export class StationRepository extends BaseRepository<Station> {
  @Inject()
  private logger: Logger;

  public async findByStationId(stationId: string): Promise<Station> {
    const station = await this.findOne({ where: { stationId } });
    if (!station) throw new StationNotFoundException();
    return station;
  }

  public async findAvailableStations() {
    return await this.find({});
  }
}
