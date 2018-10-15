import { HistorySong } from 'entities';
import { Service } from 'typedi';
import { SongFilter } from 'types';
import { SongCRUDService } from './SongCRUDService';

@Service()
export class HistorySongCRUDService extends SongCRUDService {
  public async findOne(id?: string): Promise<HistorySong> {
    const song = await super.findOne(id);
    return HistorySong.fromSong(song);
  }

  public async findAllAndCount(
    page?: number,
    perPage?: number,
    sortField?: string,
    sortOrder?: string,
    filter?: SongFilter
  ): Promise<[HistorySong[], number]> {
    const [entities, total] = await super.findAllAndCount(page, perPage, sortField, sortOrder, filter);
    return [entities.map(HistorySong.fromSong), total];
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
  ): Promise<HistorySong> {
    const song = await super.update(
      id,
      songId,
      title,
      url,
      creatorId,
      stationId,
      duration,
      thumbnail,
      isPlayed,
      upVotes,
      downVotes
    );
    return HistorySong.fromSong(song);
  }

  public async delete(id: string): Promise<HistorySong> {
    const song = await super.delete(id);
    return HistorySong.fromSong(song);
  }

  protected getDefaultFilter() {
    return {
      isPlayed: true
    };
  }
}
