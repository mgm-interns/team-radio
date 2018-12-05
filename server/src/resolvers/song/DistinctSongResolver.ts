import { DistinctSong } from 'entities';
import { BadRequestException } from 'exceptions';
import { DistinctSongRepository, StationRepository } from 'repositories';
import { Arg, Int, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { DistinctSongFilter, ListMetaData } from 'types';
import { BaseSongResolver } from './BaseSongResolver';

@Resolver(of => DistinctSong)
export class DistinctSongResolver extends BaseSongResolver {
  @Inject()
  private songRepository: DistinctSongRepository;

  @InjectRepository()
  private stationRepository: StationRepository;

  @Query(returns => [DistinctSong], {
    name: 'allDistinctHistorySongs',
    description: 'Get all distinct songs by specific query'
  })
  public async allDistinctHistorySongs(
    @Arg('filter', type => DistinctSongFilter) filter: DistinctSongFilter,
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string
  ): Promise<DistinctSong[]> {
    if (sortField || sortOrder) throw new BadRequestException('Sort field or sort order are not supported.');
    const station = await this.stationRepository.findByStationId(filter.stationId);
    return this.songRepository.findAllDistinctSongs({ stationId: station.id, isPlayed: true }, page, perPage);
  }

  @Query(returns => ListMetaData, { name: '_allDistinctHistorySongs', description: 'Get meta for all distinct songs' })
  public async countDistinctHistorySongs(
    @Arg('filter', type => DistinctSongFilter) filter: DistinctSongFilter,
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number,
    @Arg('sortField', { nullable: true }) sortField?: string,
    @Arg('sortOrder', { nullable: true }) sortOrder?: string
  ): Promise<ListMetaData> {
    if (sortField || sortOrder) throw new BadRequestException('Sort field or sort order are not supported.');
    const station = await this.stationRepository.findByStationId(filter.stationId);
    const count = await this.songRepository.countAllDistinctSongs({ stationId: station.id, isPlayed: true });
    return new ListMetaData(count);
  }
}
