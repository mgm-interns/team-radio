import { PlaylistSong, User } from 'entities';
import { StationNotFoundException, UnprocessedEntityException } from 'exceptions';
import { SongRepository, StationRepository } from 'repositories';
import { Logger } from 'services';
import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { AnonymousUser, RealTimeStation } from '..';

@Service()
export class RealTimeStationsManager {
  @Inject()
  private logger: Logger;

  @InjectRepository()
  private stationRepository: StationRepository;

  @InjectRepository()
  private songRepository: SongRepository;

  private list: RealTimeStation[] = [];

  public get stations() {
    return this.list;
  }

  // TODO: Update sort algorithm
  public get orderedStations() {
    return this.list.sort((s1, s2) => s2.onlineCount - s1.onlineCount);
  }

  public findStation(stationId: string): RealTimeStation {
    const station = this.list.find(station => station.stationId === stationId);
    if (!station) throw new StationNotFoundException();
    return station;
  }

  public async initialize() {
    const stations = await this.stationRepository.findAvailableStations();
    this.list = await Promise.all(
      stations.map(async station => {
        const songs = await this.songRepository.find({ where: { isPlayed: false, stationId: station.id } });
        return RealTimeStation.fromStation(station, songs.map(PlaylistSong.fromSong));
      })
    );
    this.logger.info('Initialized real time stations manager service');
  }

  public joinStation(stationId: string, user: User | AnonymousUser): boolean {
    const station = this.findStation(stationId);
    if (user instanceof User) {
      if (station.addOnlineUser(user)) return true;
    } else {
      if (station.addAnonymousUser(user)) return true;
    }
    throw new UnprocessedEntityException('User is not permitted to join this station');
  }

  public leaveStation(stationId: string, user: User | AnonymousUser): boolean {
    const station = this.findStation(stationId);
    if (user instanceof User) {
      if (station.removeOnlineUser(user)) return true;
    } else {
      if (station.removeAnonymousUser(user)) return true;
    }
    throw new UnprocessedEntityException('Can not find user in station');
  }
}
