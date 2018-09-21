import { User } from 'entities';
import { StationNotFoundException, UnprocessedEntityException } from 'exceptions';
import { StationRepository, UserRepository } from 'repositories';
import { Logger } from 'services';
import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { AnonymousUser, RealTimeStation } from '..';

@Service()
export class StationsManager {
  @Inject()
  private logger: Logger;

  @InjectRepository()
  private stationRepository: StationRepository;

  @InjectRepository()
  private userRepository: UserRepository;

  private list: RealTimeStation[];

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
    this.list = stations.map(station => RealTimeStation.fromStation(station));
    this.logger.info('Initialized real time stations manager service');
  }

  public joinStation(stationId: string, user: User | AnonymousUser): boolean {
    const station = this.list.find(station => station.stationId === stationId);
    if (!station) throw new StationNotFoundException();
    if (user instanceof User) {
      if (station.addOnlineUser(user)) return true;
    } else {
      if (station.addAnonymousUser(user)) return true;
    }
    throw new UnprocessedEntityException('User has already been in station');
  }

  public leaveStation(stationId: string, user: User | AnonymousUser): boolean {
    const station = this.list.find(station => station.stationId === stationId);
    if (!station) throw new StationNotFoundException();
    if (user instanceof User) {
      if (station.removeOnlineUser(user)) return true;
    } else {
      if (station.removeAnonymousUser(user)) return true;
    }
    throw new UnprocessedEntityException('Can not find user in station');
  }
}
