import { DataAccess } from 'config';
import { DistinctSong, Song, Station } from 'entities';
import Container, { Service } from 'typedi';
import { MongoRepository } from 'typeorm';
import { Logger } from 'services';

@Service()
export class DistinctSongRepository {
  public async findAllDistinctSongs(
    where: Partial<Song> = {},
    page: number = 1,
    perPage: number = 10
  ): Promise<DistinctSong[]> {
    const { limit, skip } = this.parsePagination(page, perPage);
    this.logger.debug('where', where);
    const entities = await this.mongoRepository
      .aggregate([
        {
          $match: where
        },
        {
          $group: {
            _id: '$url',
            title: { $last: '$title' },
            url: { $last: '$url' },
            duration: { $last: '$duration' },
            thumbnail: { $last: '$thumbnail' },
            isPlayed: { $last: '$isPlayed' },
            createdAt: { $last: '$createdAt' },
            stationId: { $last: '$stationId' },
            creatorId: { $last: '$creatorId' }
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        },
        { $limit: limit },
        { $skip: skip }
      ])
      .toArray();

    return entities.map(DistinctSong.fromObject);
  }

  public async countAllDistinctSongs(where: Partial<Song> = {}): Promise<number> {
    this.logger.info(where);
    const entities = await this.mongoRepository
      .aggregate([
        {
          $match: where
        },
        {
          $group: {
            _id: '$url',
            title: { $last: '$title' },
            url: { $last: '$url' },
            duration: { $last: '$duration' },
            thumbnail: { $last: '$thumbnail' },
            isPlayed: { $last: '$isPlayed' },
            createdAt: { $last: '$createdAt' },
            stationId: { $last: '$stationId' },
            creatorId: { $last: '$creatorId' }
          }
        },
        {
          $count: 'total_songs'
        }
      ])
      .toArray();
    this.logger.info(entities);
    return entities[0]['total_songs'];
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

    return this.mongoRepository.findOneOrFail(songs[0]['_id']);
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

  private get logger(): Logger {
    return Container.get(Logger);
  }
}
