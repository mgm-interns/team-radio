import { Song, Station } from 'entities';
import { SongNotFoundException } from 'exceptions';
import { Service } from 'typedi';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../BaseRepository';

@Service()
@EntityRepository(Song)
export class SongRepository extends BaseRepository<Song> {
  public async findBySongId(songId: string): Promise<Song> {
    const station = await this.findOne({ where: { songId } });
    if (!station) throw new SongNotFoundException();
    return station;
  }

  public async findAvailableSongs(): Promise<Song[]> {
    return this.find({});
  }

  public async findPlaylistSongs(station: Station): Promise<Song[]> {
    return this.find({ where: { isPlayed: false, stationId: station.id } });
  }
}
