import { Station } from 'entities';
import { StationNotFoundException } from 'exceptions';
import { ObjectId } from 'mongodb';
import { Logger } from 'services';
import { Inject, Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';

@Service()
@EntityRepository(Station)
export class StationRepository extends Repository<Station> {
  @Inject()
  private logger: Logger;

  public async findById(id: string): Promise<Station> {
    const station = await this.findOne({ where: { id: new ObjectId(id) } });
    if (!station) throw new StationNotFoundException();
    return station;
  }
}
