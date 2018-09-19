import { ObjectId } from 'bson';
import { DataAccess } from 'config';
import { Song } from 'entities';
import { SongRepository } from 'repositories';
import { Container, Service } from 'typedi';
import { SongFilter } from 'types';
import { BaseCRUDService } from '..';
import { SongNotFoundException, BadRequestException, MethodNotAllowedException } from 'exceptions';

@Service()
export class SongCRUDService extends BaseCRUDService {
  public async findOne(id?: string): Promise<Song> {
    if (id) {
      let song;
      if (id) song = await this.songRepository.findOne(id);
      if (!song) throw new SongNotFoundException();
      return song;
    }
    throw new BadRequestException('You need to provide id');
  }

  public async findAllAndCount(
    page?: number,
    perPage?: number,
    sortField?: string,
    sortOrder?: string,
    filter?: SongFilter
  ): Promise<[Song[], number]> {
    if (filter && filter.ids) {
      const total = filter.ids.length;
      const entities = await Promise.all(filter.ids.map(id => this.songRepository.findOneOrFail(id)));
      return [entities, total];
    }
    if (filter && (filter.stationId || filter.station)) {
      const stationId = filter.stationId || (filter.station && filter.station.id);
      const condition = this.parseAllCondition(page, perPage, sortField, sortOrder, filter);
      return this.songRepository.findAndCount({
        ...condition,
        where: {
          ...condition.where,
          ...this.getDefaultFilter(),
          stationId: new ObjectId(stationId)
        }
      });
    }
    const condition = this.parseAllCondition(page, perPage, sortField, sortOrder, filter);
    return this.songRepository.findAndCount({
      ...condition,
      where: {
        ...condition.where,
        ...this.getDefaultFilter()
      }
    });
  }

  public async create(): Promise<Song> {
    throw new MethodNotAllowedException();
  }

  public async update(
    id: string,
    songId?: string,
    title?: string,
    url?: string,
    creatorId?: string,
    stationId?: string,
    duration?: number,
    thumbnail?: string,
    isPlayed?: boolean,
    upVotes?: string[],
    downVotes?: string[]
  ): Promise<Song> {
    const song = await this.songRepository.findOneOrFail(id);
    if (songId) song.songId = songId;
    if (title) song.title = title;
    if (url) song.url = url;
    if (creatorId) song.creatorId = creatorId;
    if (stationId) song.stationId = stationId;
    if (duration) song.duration = duration;
    if (thumbnail) song.thumbnail = thumbnail;
    if (isPlayed) song.isPlayed = isPlayed;
    if (upVotes) song.upVotes = upVotes;
    if (downVotes) song.downVotes = downVotes;
    return this.songRepository.saveOrFail(song);
  }

  public async delete(id: string): Promise<Song> {
    const song = await this.songRepository.findOneOrFail(id);
    await this.songRepository.remove(song);
    return song;
  }

  protected getDefaultFilter() {
    return {};
  }

  private get songRepository(): SongRepository {
    return Container.get(DataAccess).getRepository(SongRepository);
  }
}
