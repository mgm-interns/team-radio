import { DataAccess } from 'config';
import { PlaylistSong, Station, User } from 'entities';
import { BadRequestException } from 'exceptions';
import { StationRepository } from 'repositories';
import { Logger } from 'services';
import { AnonymousUser, StationTopic, SubscriptionManager } from 'subscription';
import { Container } from 'typedi';
import { RealTimeStationPlayerManager } from './RealTimeStationPlayerManager';

export class RealTimeStationManager extends Station {
  public onlineUsers: User[] = [];

  public onlineAnonymous: AnonymousUser[] = [];

  public get onlineCount(): number {
    return this.onlineUsers.length + this.onlineAnonymous.length;
  }

  private _player: RealTimeStationPlayerManager = new RealTimeStationPlayerManager();

  public get player(): RealTimeStationPlayerManager {
    return this._player;
  }

  public addOnlineUser(user: User): boolean {
    let userIndex = -1;
    const beforeOnlineUsersChanged = this.onlineCount;
    for (let index = 0; index < this.onlineUsers.length; index += 1) {
      if (this.onlineUsers[index].username === user.username) {
        userIndex = index;
        break;
      }
    }
    if (userIndex === -1) {
      this.onlineUsers.push(user);
      this.onUserChanged(beforeOnlineUsersChanged);
      this.logger.info(`User ${user.username} has joined station ${this.stationId}`);
      return true;
    }
    return false;
  }

  public removeOnlineUser(user: User): boolean {
    let removedIndex = -1;
    const beforeOnlineUsersChanged = this.onlineCount;
    for (let index = 0; index < this.onlineUsers.length; index += 1) {
      if (this.onlineUsers[index].username === user.username) {
        removedIndex = index;
        break;
      }
    }
    if (removedIndex === -1) return false;
    this.onlineUsers.splice(removedIndex, 1);
    this.onUserChanged(beforeOnlineUsersChanged);
    this.logger.info(`User ${user.username} has leaved station ${this.stationId}`);
    return true;
  }

  public addAnonymousUser(user: AnonymousUser): boolean {
    let userIndex = -1;
    const beforeOnlineUsersChanged = this.onlineCount;
    for (let index = 0; index < this.onlineAnonymous.length; index += 1) {
      if (this.onlineAnonymous[index].clientId === user.clientId) {
        userIndex = index;
        break;
      }
    }
    if (userIndex === -1) {
      this.onlineAnonymous.push(user);
      this.onUserChanged(beforeOnlineUsersChanged);
      this.logger.info(`Anonymous user ${user.clientId} has joined station ${this.stationId}`);
      return true;
    }
    return false;
  }

  public removeAnonymousUser(user: AnonymousUser): boolean {
    let removedIndex = -1;
    const beforeOnlineUsersChanged = this.onlineCount;
    for (let index = 0; index < this.onlineAnonymous.length; index += 1) {
      if (this.onlineAnonymous[index].clientId === user.clientId) {
        removedIndex = index;
        break;
      }
    }
    if (removedIndex === -1) return false;
    this.onlineAnonymous.splice(removedIndex, 1);
    this.onUserChanged(beforeOnlineUsersChanged);
    this.logger.info(`Anonymous user ${user.clientId} has leaved station ${this.stationId}`);
    return true;
  }

  public isExistedUser(user: User | AnonymousUser) {
    return user instanceof User
      ? this.onlineUsers.some(({ username }) => username === user.username)
      : this.onlineAnonymous.some(({ clientId }) => clientId === user.clientId);
  }

  // TODO: Add an option to publish a notification about skipping unavailable song for QoL improvement
  public async removeUnavailableSongFromPlayer(url: string) {
    if (!this.player.playing || this.player.playing.song.url !== url) {
      this.logger.error(`Song ${url} is not in playing state`);
      throw new BadRequestException(`Song ${url} is not in playing state`);
    }
    const song = this.player.playlist.find(song => song.url === url);
    if (!song) {
      this.logger.error(`Song ${url} is not found in playlist`);
      throw new BadRequestException(`Song ${url} is not found in playlist`);
    }
    await this.player.stop();
    await this.player.restart();
  }

  public async updateStationState(startingTime: number | null, currentPlayingSongId: string | null) {
    this.startingTime = startingTime;
    this.currentPlayingSongId = currentPlayingSongId;
    const station = await this.stationRepository.findOneOrFail(this.id);
    station.startingTime = startingTime;
    station.currentPlayingSongId = currentPlayingSongId;
    this.logger.info(`Station ${this.stationId} has new state:`, { startingTime, currentPlayingSongId });
    return this.stationRepository.saveOrFail(station);
  }

  public async publish<Payload>(
    triggerName: string,
    payload: ExcludeOne<Payload, StationTopic.StationIdPayload>
  ): Promise<boolean> {
    this.logger.debug(`Publish event ${triggerName} with payload:`, payload);
    await this.subscriptionManager.pubSub.publish(triggerName, Object.assign(this.getDefaultPubSubPayload(), payload));
    return true;
  }

  public static async fromStation(
    station: Station,
    playlist: PlaylistSong[],
    onlineUsers: User[] = [],
    onlineAnonymous: AnonymousUser[] = []
  ): Promise<RealTimeStationManager> {
    const realTimeStation = Object.assign(new RealTimeStationManager(), station);
    realTimeStation.onlineUsers = onlineUsers;
    realTimeStation.onlineAnonymous = onlineAnonymous;
    realTimeStation.player.playlist = playlist;
    realTimeStation.player.parent = realTimeStation;
    realTimeStation.registerPubSub();
    if (realTimeStation.currentPlayingSongId && realTimeStation.startingTime) realTimeStation.startPlayer();
    return realTimeStation;
  }

  protected registerPubSub() {
    this.subscriptionManager.pubSub.subscribe(StationTopic.ADD_PLAYLIST_SONG, this.onAddedSong.bind(this));
  }

  protected async startPlayer() {
    this.player.start();
    await this.publish<StationTopic.StartPlayerPayLoad>(StationTopic.START_PLAYER, { stationId: this.stationId });
  }

  protected onUserChanged(oldOnlineCount: number) {
    // Start player if there is a user join to the station and there is at least 1 song in the playlist
    if (oldOnlineCount === 0 && this.onlineCount > 0) {
      if (!this.player.playing && this.player.playlist.length > 0) {
        setTimeout(this.startPlayer.bind(this), 5000);
      }
    }
  }

  protected async onAddedSong(payload: StationTopic.AddPlaylistSongPayLoad) {
    // Filter by stationId
    if (payload.stationId === this.stationId) {
      // Check if the song is already in the list
      if (!this.player.playlist.some(song => song.id === payload.song.id)) {
        this.player.playlist = [...this.player.playlist, PlaylistSong.fromSong(payload.song)];
        if (!this.player.playing) {
          await this.publish<StationTopic.UpdatePlayerSongPayLoad>(StationTopic.UPDATE_PLAYER_SONG, { song: null });
          setTimeout(this.startPlayer.bind(this), 5000);
        }
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
