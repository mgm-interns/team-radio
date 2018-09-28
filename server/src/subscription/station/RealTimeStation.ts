import { DataAccess } from 'config';
import { PlaylistSong, Station, User } from 'entities';
import { StationRepository } from 'repositories';
import { Logger } from 'services';
import { AnonymousUser, SubscriptionManager, StationTopic } from 'subscription';
import { Field, Int, ObjectType } from 'type-graphql';
import { Container } from 'typedi';
import { RealTimeStationPlayer } from '.';

@ObjectType()
export class RealTimeStation extends Station {
  @Field(type => [User])
  onlineUsers: User[] = [];

  @Field(type => [AnonymousUser])
  onlineAnonymous: AnonymousUser[] = [];

  @Field(type => Int)
  public get onlineCount(): number {
    return this.onlineUsers.length + this.onlineAnonymous.length;
  }

  private _player: RealTimeStationPlayer = new RealTimeStationPlayer();

  public get player(): RealTimeStationPlayer {
    return this._player;
  }

  public addOnlineUser(user: User): boolean {
    let userIndex = -1;
    for (let index = 0; index < this.onlineUsers.length; index += 1) {
      if (this.onlineUsers[index].username === user.username) {
        userIndex = index;
        break;
      }
    }
    if (userIndex === -1) {
      this.onlineUsers.push(user);
      this.onUserChanged();
      this.logger.info(`User ${user.username} has joined station ${this.stationId}`);
      return true;
    }
    return false;
  }

  public removeOnlineUser(user: User): boolean {
    let removedIndex = -1;
    for (let index = 0; index < this.onlineUsers.length; index += 1) {
      if (this.onlineUsers[index].username === user.username) {
        removedIndex = index;
        break;
      }
    }
    if (removedIndex === -1) return false;
    this.onlineUsers.splice(removedIndex, 1);
    this.onUserChanged();
    this.logger.info(`User ${user.username} has leaved station ${this.stationId}`);
    return true;
  }

  public addAnonymousUser(user: AnonymousUser): boolean {
    let userIndex = -1;
    for (let index = 0; index < this.onlineAnonymous.length; index += 1) {
      if (this.onlineAnonymous[index].clientId === user.clientId) {
        userIndex = index;
        break;
      }
    }
    if (userIndex === -1) {
      this.onlineAnonymous.push(user);
      this.onUserChanged();
      this.logger.info(`Anonymous user ${user.clientId} has joined station ${this.stationId}`);
      return true;
    }
    return false;
  }

  public removeAnonymousUser(user: AnonymousUser): boolean {
    let removedIndex = -1;
    for (let index = 0; index < this.onlineAnonymous.length; index += 1) {
      if (this.onlineAnonymous[index].clientId === user.clientId) {
        removedIndex = index;
        break;
      }
    }
    if (removedIndex === -1) return false;
    this.onlineAnonymous.splice(removedIndex, 1);
    this.onUserChanged();
    this.logger.info(`Anonymous user ${user.clientId} has leaved station ${this.stationId}`);
    return true;
  }

  public isExistedUser(user: User | AnonymousUser) {
    return user instanceof User
      ? this.onlineUsers.some(({ username }) => username === user.username)
      : this.onlineAnonymous.some(({ clientId }) => clientId === user.clientId);
  }

  public async updateStationState(startingTime: number | null, currentPlayingSongId: string | null) {
    this.startingTime = startingTime;
    this.currentPlayingSongId = currentPlayingSongId;
    const station = await this.stationRepository.findOneOrFail(this.id);
    station.startingTime = startingTime;
    station.currentPlayingSongId = currentPlayingSongId;
    this.logger.info(`Station ${this.stationId} has new state:`, { startingTime, currentPlayingSongId });
    return this.stationRepository.save(station);
  }

  public publish<Payload>(triggerName: string, payload: ExcludeOne<Payload, StationTopic.StationIdPayload>): boolean {
    this.logger.debug(`Publish event ${triggerName} with payload:`, payload);
    return this.subscriptionManager.pubSub.publish(triggerName, Object.assign(this.getDefaultPubSubPayload(), payload));
  }

  public registerPubSub() {
    this.subscriptionManager.pubSub.subscribe(StationTopic.ADD_PLAYLIST_SONG, this.onAddedSong.bind(this));
  }

  public startPlayer() {
    this.player.start();
    this.publish<StationTopic.StartPlayerPayLoad>(StationTopic.START_PLAYER, { stationId: this.stationId });
  }

  public static async fromStation(
    station: Station,
    playlist: PlaylistSong[],
    onlineUsers: User[] = [],
    onlineAnonymous: AnonymousUser[] = []
  ): Promise<RealTimeStation> {
    const realTimeStation = Object.assign(new RealTimeStation(), station);
    realTimeStation.onlineUsers = onlineUsers;
    realTimeStation.onlineAnonymous = onlineAnonymous;
    realTimeStation.player.playlist = playlist;
    realTimeStation.player.parent = realTimeStation;
    realTimeStation.registerPubSub();
    if (realTimeStation.currentPlayingSongId && realTimeStation.startingTime) realTimeStation.startPlayer();
    return realTimeStation;
  }

  protected onUserChanged() {
    // TODO: Start player or do something in here
  }

  protected onAddedSong(payload: StationTopic.AddPlaylistSongPayLoad) {
    // Filter by stationId
    if (payload.stationId === this.stationId) {
      // Check if the song is already in the list
      if (!this.player.playlist.some(song => song.id === payload.song.id)) {
        this.player.playlist = [...this.player.playlist, PlaylistSong.fromSong(payload.song)];
        if (!this.player.playing) this.startPlayer();
      }
    }
  }

  private get logger(): Logger {
    return Container.get(Logger);
  }

  private get subscriptionManager(): SubscriptionManager {
    return Container.get(SubscriptionManager);
  }

  private get stationRepository(): StationRepository {
    return Container.get(DataAccess).connection.getCustomRepository(StationRepository);
  }

  private getDefaultPubSubPayload(): StationTopic.StationIdPayload {
    return { stationId: this.stationId };
  }
}

/**
 * @description: Exclude properties from the Payload which provided by ExcludedPayload
 */
type ExcludeOne<Payload, ExcludedPayload> = { [P in Exclude<keyof Payload, keyof ExcludedPayload>]: Payload[P] };
