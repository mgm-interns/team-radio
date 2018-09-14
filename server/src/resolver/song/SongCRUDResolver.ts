import { ObjectID } from 'bson';
import { Song } from 'entities';
import { BadRequestException, MethodNotAllowedException, SongNotFoundException } from 'exceptions';
import { CRUDService } from 'services';
import { Arg, Authorized, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { BaseFilter, ListMetaData, SongFilter } from 'types';
import { BaseSongResolver } from '.';
import { ICRUDResolver } from '..';

@Resolver(of => Song)
export class SongCRUDResolver extends BaseSongResolver implements ICRUDResolver<Song> {
  @Inject()
  private crudService: CRUDService;

  @Query(returns => Song, { name: 'Song', description: 'Get song by id' })
  public async one(@Arg('id', { nullable: true }) id?: string): Promise<Song> {
    if (id) {
      let song;
      if (id) song = await this.songRepository.findOne(id);
      if (!song) throw new SongNotFoundException();
      return song;
    }
    throw new BadRequestException('You need to provide id');
  }

  @Authorized()
  @Query(returns => [Song], { name: 'allSongs', description: 'Get all the songs in system.' })
  public async all(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => SongFilter, { nullable: true }) filter?: SongFilter
  ): Promise<Song[]> {
    if (filter && filter.ids) {
      return Promise.all(filter.ids.map(id => this.songRepository.findOneOrFail(id)));
    }
    if (filter && (filter.stationId || filter.station)) {
      const stationId = filter.stationId || (filter.station && filter.station.id);
      const condition = this.crudService.parseAllCondition(page, perPage, sortField, sortOrder, filter);
      return this.songRepository.find({
        ...condition,
        where: {
          ...condition.where,
          ...this.getDefaultFilter(),
          stationId: new ObjectID(stationId)
        }
      });
    }
    const condition = this.crudService.parseAllCondition(page, perPage, sortField, sortOrder, filter);
    return this.songRepository.find({
      ...condition,
      where: {
        ...condition.where,
        ...this.getDefaultFilter()
      }
    });
  }

  // TODO: Solve .count function
  @Authorized()
  @Query(returns => ListMetaData, { name: '_allSongsMeta', description: 'Get all the songs in system.' })
  public async meta(
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string,
    @Arg('filter', type => SongFilter, { nullable: true }) filter?: SongFilter
  ): Promise<ListMetaData> {
    const [songs, total] = await this.songRepository.findAndCount({
      ...this.crudService.parseAllCondition(page, perPage, sortField, sortOrder, filter)
    });
    return new ListMetaData(total);
  }

  @Authorized()
  @Mutation(returns => Song, { name: 'createSong', description: 'Create a song in system.' })
  public async create(): Promise<Song> {
    throw new MethodNotAllowedException();
  }

  @Authorized()
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

  @Authorized()
  @Mutation(returns => Song, { name: 'deleteSong', description: 'Delete a song in system.' })
  public async delete(@Arg('id') id: string): Promise<Song> {
    const song = await this.songRepository.findOneOrFail(id);
    await this.songRepository.remove(song);
    return song;
  }

  protected getDefaultFilter() {
    return {};
  }
}
