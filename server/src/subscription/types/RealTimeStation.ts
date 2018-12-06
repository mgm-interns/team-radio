import { ObjectType, Field, Int } from 'type-graphql';
import { Station, User } from 'entities';
import { AnonymousUser } from './AnonymousUser';
import { RealTimeStationManager } from '../station';

@ObjectType()
export class RealTimeStation extends Station {
  @Field(type => [User])
  onlineUsers: User[] = [];

  @Field(type => [AnonymousUser])
  onlineAnonymous: AnonymousUser[] = [];

  @Field(type => Int)
  onlineCount: number = 0;

  public static fromRealTimeStationManager(manager: RealTimeStationManager): RealTimeStation {
    const realTimeStation = new RealTimeStation();
    realTimeStation.UNSAFE_setObjectId(manager.UNSAFE_getObjectId());
    realTimeStation.stationId = manager.stationId;
    realTimeStation.stationName = manager.stationName;
    realTimeStation.createdAt = manager.createdAt;
    realTimeStation.startingTime = manager.startingTime;
    realTimeStation.currentPlayingSongId = manager.currentPlayingSongId;
    realTimeStation.ownerId = manager.ownerId;
    realTimeStation.isPrivate = manager.isPrivate;
    realTimeStation.onlineUsers = manager.onlineUsers;
    realTimeStation.onlineAnonymous = manager.onlineAnonymous;
    realTimeStation.onlineCount = manager.onlineCount;
    return realTimeStation;
  }
}
