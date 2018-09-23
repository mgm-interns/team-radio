import { Song, UserRole } from 'entities';
import { MethodNotAllowedException } from 'exceptions';
import { SongCRUDService } from 'services';
import { Arg, Authorized, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { ListMetaData, SongFilter } from 'types';
import { BaseSongResolver } from '.';
import { ICRUDResolver } from '..';

@Resolver(of => Song)
export class SongCRUDResolver extends BaseSongResolver implements ICRUDResolver<Song> {
  @Inject()
  private songCRUDService: SongCRUDService;

  @Query(returns => Song, { name: 'Song', description: 'Get song by id' })
  public async one(@Arg('id', { nullable: true }) id?: string): Promise<Song> {
    return this.songCRUDService.findOne(id);
  }

  @Query(returns => [Song], { name: 'allSongs', description: 'Get all the songs in system.' })
  public async all(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => SongFilter, { nullable: true }) filter?: SongFilter
  ): Promise<Song[]> {
    const [entities] = await this.songCRUDService.findAllAndCount(page, perPage, sortField, sortOrder, filter);
    return entities;
  }

  @Query(returns => ListMetaData, { name: '_allSongsMeta', description: 'Get meta for all the songs in system.' })
  public async meta(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => SongFilter, { nullable: true }) filter?: SongFilter
  ): Promise<ListMetaData> {
    const [entities, total] = await this.songCRUDService.findAllAndCount(page, perPage, sortField, sortOrder, filter);
    return new ListMetaData(total);
  }

  @Authorized()
  @Mutation(returns => Song, { name: 'createSong', description: 'Create a song in system.' })
  public async create(): Promise<Song> {
    throw new MethodNotAllowedException();
  }

  @Authorized([UserRole.STATION_OWNER])
  @Mutation(returns => Song, { name: 'updateSong', description: 'Update a song in system.' })
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
  ): Promise<Song> {
    return this.songCRUDService.update(
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
  }

  @Authorized([UserRole.STATION_OWNER])
  @Mutation(returns => Song, { name: 'deleteSong', description: 'Delete a song in system.' })
  public async delete(@Arg('id') id: string): Promise<Song> {
    return this.songCRUDService.delete(id);
  }
}
