import { Station } from 'entities';
import { Field, Int, ObjectType } from 'type-graphql';
import { RealTimeStation } from './RealTimeStation';

@ObjectType()
export class RealTimeStationWithOnlineCount extends Station {
  @Field(type => Int)
  onlineCount: number;

  public static fromRealTimeStation(station: RealTimeStation) {
    const object = new RealTimeStationWithOnlineCount();
    Object.assign(object, station);
    object.onlineCount = station.onlineCount;
    return object;
  }
}
