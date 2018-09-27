import { Station, User, PlaylistSong } from 'entities';
import { ObjectType, Field, Int } from 'type-graphql';
import { RealTimeStationPlayer } from '.';
import { AnonymousUser } from 'subscription';
import { Container } from 'typedi';
import { SubscriptionManager } from '../SubscriptionManager';
import { StationTopic } from './StationTopic';

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
    return true;
  }

  public isExistedUser(user: User | AnonymousUser) {
    return user instanceof User
      ? this.onlineUsers.some(({ username }) => username === user.username)
      : this.onlineAnonymous.some(({ clientId }) => clientId === user.clientId);
  }

  public registerPubSub() {
    this.subscriptionManager.pubSub.subscribe(StationTopic.ADD_PLAYLIST_SONG, this.onAddedSong.bind(this));
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
    return realTimeStation;
  }

  protected onUserChanged() {
    // TODO: Start player or do something in here
    if (this.onlineCount > 0) {
      if (!this.player.playing) this.startPlayer();
    }
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

  private startPlayer() {
    this.player.start();
    this.publish<StationTopic.StartPlayerPayLoad>(StationTopic.START_PLAYER, { stationId: this.stationId });
  }

  private get subscriptionManager(): SubscriptionManager {
    return Container.get(SubscriptionManager);
  }

  private publish<Payload>(triggerName: string, payload: Payload): boolean {
    return Container.get(SubscriptionManager).pubSub.publish(triggerName, payload);
  }
}
