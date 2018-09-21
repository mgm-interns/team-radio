import { Station, User, PlaylistSong } from 'entities';
import { ObjectType, Field, Int } from 'type-graphql';
import { AnonymousUser, RealTimeStationPlayer } from '.';

@ObjectType()
export class RealTimeStation extends Station {
  constructor() {
    super();
    this.player = new RealTimeStationPlayer();
  }

  @Field(type => [User])
  onlineUsers: User[] = [];

  @Field(type => [AnonymousUser])
  onlineAnonymous: AnonymousUser[] = [];

  @Field(type => Int)
  public get onlineCount(): number {
    return this.onlineUsers.length + this.onlineAnonymous.length;
  }

  player: RealTimeStationPlayer;

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
    return realTimeStation;
  }

  protected onUserChanged() {
    // TODO: Start player or do something in here
  }
}
