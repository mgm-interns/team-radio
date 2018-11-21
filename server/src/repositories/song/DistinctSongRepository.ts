import { DataAccess } from 'config';
import { DistinctSong, Song, Station } from 'entities';
import Container, { Service } from 'typedi';
import { MongoRepository } from 'typeorm';

@Service()
export class DistinctSongRepository {
  public async findAllDistinctSongs(
    station: Station,
    where: Partial<Song> = {},
    page: number = 1,
    perPage: number = 10
  ): Promise<DistinctSong[]> {
    const { limit, skip } = this.parsePagination(page, perPage);
    const entities = await this.mongoRepository
      .aggregate([
        {
          $match: { stationId: station.UNSAFE_getObjectId(), ...where }
        },
        {
          $group: {
            _id: '$url',
            title: { $first: '$title' },
            url: { $first: '$url' },
            duration: { $first: '$duration' },
            thumbnail: { $first: '$thumbnail' },
            isPlayed: { $first: '$isPlayed' }
          }
        },
        { $limit: limit },
        { $skip: skip }
      ])
      .toArray();
    return entities.map(DistinctSong.fromObject);
  }

  public async findRandomPlayedSong(stationId: string): Promise<Song> {
    const songs = await this.mongoRepository
      .aggregate([
        { $match: { stationId } },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            url: { $first: '$url' },
            duration: { $first: '$duration' },
            thumbnail: { $first: '$thumbnail' },
            isPlayed: { $first: '$isPlayed' }
          }
        },
        { $sample: { size: 1 } }
      ])
      .toArray();

    const distinctSong = DistinctSong.fromObject(songs[0]);
    return this.mongoRepository.findOneOrFail(distinctSong.id);
  }

  private parsePagination(page: number, perPage: number) {
    let limit = 10;
    let skip = 0;
    if (perPage) {
      skip = perPage * (page ? page - 1 : 0);
      limit = perPage + skip;
    }
    return { limit, skip };
  }

  private get mongoRepository(): MongoRepository<Song> {
    return Container.get(DataAccess).connection.manager.getMongoRepository(Song);
  }
}
