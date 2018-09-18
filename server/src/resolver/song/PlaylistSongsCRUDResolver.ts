import { Arg, Authorized, Int, Mutation, Query, Resolver } from 'type-graphql';
import { ListMetaData, SongFilter } from 'types';
import { PlaylistSong, UserRole } from 'entities';
import { SongCRUDResolver } from '.';

@Resolver(of => PlaylistSong)
export class PlaylistSongsCRUDResolver extends SongCRUDResolver {
  @Query(returns => PlaylistSong, { name: 'PlaylistSong', description: "Get song that's currently in playlist by id." })
  public async one(@Arg('id', { nullable: true }) id?: string): Promise<PlaylistSong> {
    const song = await super.one(id);
    return PlaylistSong.fromSong(song);
  }

  @Query(returns => [PlaylistSong], {
    name: 'allPlaylistSongs',
    description: "Get all the songs that's currently in playlist."
  })
  public async all(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => SongFilter, { nullable: true }) filter?: SongFilter
  ): Promise<PlaylistSong[]> {
    const songs = await super.all(page, perPage, sortField, sortOrder, filter);
    return songs.map(PlaylistSong.fromSong);
  }

  @Query(returns => ListMetaData, {
    name: '_allPlaylistSongsMeta',
    description: "Get meta for all the songs that's currently in playlist."
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
  @Mutation(returns => PlaylistSong, {
    name: 'createPlaylistSong',
    description: "Create a song that's currently in playlist."
  })
  public async create(): Promise<PlaylistSong> {
    return super.create();
  }

  @Authorized([UserRole.STATION_OWNER])
  @Mutation(returns => PlaylistSong, {
    name: 'updatePlaylistSong',
    description: "Update a song that's currently in playlist."
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

  @Authorized([UserRole.STATION_OWNER])
  @Mutation(returns => PlaylistSong, {
    name: 'deletePlaylistSong',
    description: "Delete a song that's currently in playlist."
  })
  public async delete(@Arg('id') id: string): Promise<PlaylistSong> {
    const song = await super.delete(id);
    return PlaylistSong.fromSong(song);
  }

  protected getDefaultFilter() {
    return {
      isPlayed: false
    };
  }
}
