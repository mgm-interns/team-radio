import { Arg, Authorized, Int, Mutation, Query, Resolver } from 'type-graphql';
import { HistorySong, UserRole } from 'entities';
import { ListMetaData, SongFilter } from 'types';
import { SongCRUDResolver } from '.';

@Resolver(of => HistorySong)
export class HistorySongsCRUDResolver extends SongCRUDResolver {
  @Query(returns => HistorySong, { name: 'HistorySong', description: "Get song that's currently in history by id." })
  public async one(@Arg('id', { nullable: true }) id?: string): Promise<HistorySong> {
    const song = await super.one(id);
    return HistorySong.fromSong(song);
  }

  @Query(returns => [HistorySong], {
    name: 'allHistorySongs',
    description: "Get all the songs that's currently in history."
  })
  public async all(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => SongFilter, { nullable: true }) filter?: SongFilter
  ): Promise<HistorySong[]> {
    const songs = await super.all(page, perPage, sortField, sortOrder, filter);
    return songs.map(HistorySong.fromSong);
  }

  @Query(returns => ListMetaData, {
    name: '_allHistorySongsMeta',
    description: "Get meta for all the songs that's currently in history."
  })
  public async meta(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => SongFilter, { nullable: true }) filter?: SongFilter
  ): Promise<ListMetaData> {
    return super.meta(page, perPage, sortField, sortOrder, filter);
  }

  @Authorized()
  @Mutation(returns => HistorySong, {
    name: 'createHistorySong',
    description: "Create a song that's currently in history.",
    deprecationReason: 'It should not be here'
  })
  public async create(): Promise<HistorySong> {
    const song = await super.create();
    return HistorySong.fromSong(song);
  }

  @Authorized([UserRole.STATION_OWNER])
  @Mutation(returns => HistorySong, {
    name: 'updateHistorySong',
    description: "Update a song that's currently in history."
  })
  public async update(
    @Arg('id') id: string,
    @Arg('songId', { nullable: true }) songId?: string,
    @Arg('title', { nullable: true }) title?: string,
    @Arg('url', { nullable: true }) url?: string,
    @Arg('creatorId', { nullable: true }) creatorId?: string,
    @Arg('stationId', { nullable: true }) stationId?: string,
    @Arg('duration', { nullable: true }) duration?: number,
    @Arg('thumbnail', { nullable: true }) thumbnail?: string,
    @Arg('isPlayed', { nullable: true }) isPlayed?: boolean,
    @Arg('upVotes', type => [String], { nullable: true }) upVotes?: string[],
    @Arg('downVotes', type => [String], { nullable: true }) downVotes?: string[]
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

  @Authorized([UserRole.STATION_OWNER])
  @Mutation(returns => HistorySong, {
    name: 'deleteHistorySong',
    description: "Delete a song that's currently in history."
  })
  public async delete(@Arg('id') id: string): Promise<HistorySong> {
    const song = await super.delete(id);
    return HistorySong.fromSong(song);
  }

  protected getDefaultFilter() {
    return {
      isPlayed: true
    };
  }
}
