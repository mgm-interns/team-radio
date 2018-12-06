import { UnavailableSong } from 'entities';
import { Service } from 'typedi';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../BaseRepository';

@Service()
@EntityRepository(UnavailableSong)
export class UnavailableSongRepository extends BaseRepository<UnavailableSong> {
  public async findUnAvailableSongByUrlOrFail(url: string): Promise<UnavailableSong> {
    return this.findOneOrFail({ where: { url } });
  }

  public async findUnAvailableSongByUrl(url: string): Promise<UnavailableSong | undefined> {
    return this.findOne({ where: { url } });
  }

  public async findUnAvailableSongs(): Promise<UnavailableSong[]> {
    return this.find({});
  }
}
