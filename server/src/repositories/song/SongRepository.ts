import { Song } from 'entities';
import { SongNotFoundException } from 'exceptions';
import { Logger } from 'services/logger';
import { Inject, Service } from 'typedi';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../BaseRepository';

@Service()
@EntityRepository(Song)
export class SongRepository extends BaseRepository<Song> {
  @Inject()
  private logger: Logger;

  public async findBySongId(songId: string): Promise<Song> {
    const station = await this.findOne({ where: { songId } });
    if (!station) throw new SongNotFoundException();
    return station;
  }

  public async findAvailableSongs() {
    return await this.find({});
  }
}
