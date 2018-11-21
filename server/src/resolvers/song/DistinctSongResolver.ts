import { DistinctSong } from 'entities';
import { DistinctSongRepository, StationRepository } from 'repositories';
import { Arg, Int, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { DistinctSongFilter } from 'types';
import { BaseSongResolver } from './BaseSongResolver';

@Resolver(of => DistinctSong)
export class DistinctSongResolver extends BaseSongResolver {
  @InjectRepository()
  private songRepository: DistinctSongRepository;

  @InjectRepository()
  private stationRepository: StationRepository;

  @Query(returns => [DistinctSong], { name: 'allDistinctHistorySongs', description: 'Get song by id' })
  public async allDistinctHistorySongs(
    @Arg('filter', type => DistinctSongFilter) filter: DistinctSongFilter,
    @Arg('page', type => Int, { nullable: true }) page?: number,
    @Arg('perPage', type => Int, { nullable: true }) perPage?: number
  ): Promise<DistinctSong[]> {
    const station = await this.stationRepository.findByStationId(filter.stationId);
    return this.songRepository.findAllDistinctSongs(station, { isPlayed: true }, page, perPage);
  }
}
