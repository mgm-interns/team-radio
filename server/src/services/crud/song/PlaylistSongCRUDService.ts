import { Service } from 'typedi';
import { SongCRUDService } from '.';
import { PlaylistSong } from 'entities';
import { SongFilter } from 'types';

@Service()
export class PlaylistSongCRUDService extends SongCRUDService {
  public async findOne(id?: string): Promise<PlaylistSong> {
    const song = await super.findOne(id);
    return PlaylistSong.fromSong(song);
  }

  public async findAllAndCount(
    page?: number,
    perPage?: number,
    sortField?: string,
    sortOrder?: string,
    filter?: SongFilter
  ): Promise<[PlaylistSong[], number]> {
    const [entities, total] = await super.findAllAndCount(page, perPage, sortField, sortOrder, filter);
    return [entities.map(PlaylistSong.fromSong), total];
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
  ): Promise<PlaylistSong> {
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
    return PlaylistSong.fromSong(song);
  }

  public async delete(id: string): Promise<PlaylistSong> {
    const song = await super.delete(id);
    return PlaylistSong.fromSong(song);
  }

  protected getDefaultFilter() {
    return {
      isPlayed: false
    };
  }
}
