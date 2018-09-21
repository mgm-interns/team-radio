import { Station, User } from 'entities';
import { ObjectType, Field, Int } from 'type-graphql';
import { AnonymousUser } from '.';

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
    return true;
  }

  public isExistedUser(user: User | AnonymousUser) {
    return user instanceof User
      ? this.onlineUsers.some(({ username }) => username === user.username)
      : this.onlineAnonymous.some(({ clientId }) => clientId === user.clientId);
  }

  public static fromStation(
    station: Station,
    onlineUsers: User[] = [],
    onlineAnonymous: AnonymousUser[] = []
  ): RealTimeStation {
    const realTimeStation = Object.assign(new RealTimeStation(), station);
    realTimeStation.onlineUsers = onlineUsers;
    realTimeStation.onlineAnonymous = onlineAnonymous;
    return realTimeStation;
  }
}
