import { Station } from 'entities';
import { Field, Int, ObjectType } from 'type-graphql';
import { RealTimeStation } from '.';

// TODO: convert this entities to manager type
@ObjectType()
export class RealTimeStationWithOnlineCount extends Station {
  @Field(type => Int)
  onlineCount: number;

  @Field(type => String, { nullable: true })
  thumbnail: string;

  public static fromRealTimeStation(station: RealTimeStation) {
    const object = new RealTimeStationWithOnlineCount();
    Object.assign(object, station);
    object.onlineCount = station.onlineCount;
    if (station.player.playing) object.thumbnail = station.player.playing.song.thumbnail;
    return object;
  }
}
