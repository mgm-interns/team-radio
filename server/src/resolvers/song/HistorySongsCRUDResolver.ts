import { HistorySong, UserRole } from 'entities';
import { MethodNotAllowedException } from 'exceptions';
import { HistorySongCRUDService } from 'services';
import { Arg, Authorized, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { ListMetaData, SongFilter } from 'types';
import { SongCRUDResolver } from './SongCRUDResolver';

@Resolver(of => HistorySong)
export class HistorySongsCRUDResolver extends SongCRUDResolver {
  @Inject()
  private historySongCRUDService: HistorySongCRUDService;

  @Query(returns => HistorySong, { name: 'HistorySong', description: "Get song that's currently in history by id." })
  public async one(@Arg('id', { nullable: true }) id?: string): Promise<HistorySong> {
    return this.historySongCRUDService.findOne(id);
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
    const [entities] = await this.historySongCRUDService.findAllAndCount(page, perPage, sortField, sortOrder, filter);
    return entities;
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
    const [entities, total] = await this.historySongCRUDService.findAllAndCount(
      page,
      perPage,
      sortField,
      sortOrder,
      filter
    );
    return new ListMetaData(total);
  }

  @Authorized()
  @Mutation(returns => HistorySong, {
    name: 'createHistorySong',
    description: "Create a song that's currently in history.",
    deprecationReason: 'It should not be here'
  })
  public async create(): Promise<HistorySong> {
    throw new MethodNotAllowedException();
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
    return this.historySongCRUDService.update(
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
  @Mutation(returns => HistorySong, {
    name: 'deleteHistorySong',
    description: "Delete a song that's currently in history."
  })
  public async delete(@Arg('id') id: string): Promise<HistorySong> {
    return this.historySongCRUDService.delete(id);
  }

  protected getDefaultFilter() {
    return {
      isPlayed: true
    };
  }
}
