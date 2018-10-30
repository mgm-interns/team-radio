import { PlaylistSong } from 'entities';
import { Field, Int, ObjectType } from 'type-graphql';
import { RealTimeStationPlayerManager } from '../station/RealTimeStationPlayerManager';

@ObjectType()
export class RealTimeStationPlaylist {
  @Field(type => [PlaylistSong])
  public playlist: PlaylistSong[] = [];

  @Field(type => Int, { nullable: true })
  public currentlyPlayingAt: number | null;

  static fromRealTimeStationPlayerManager(manager: RealTimeStationPlayerManager): RealTimeStationPlaylist {
    const player = new RealTimeStationPlaylist();
    player.playlist = manager.playlist;
    player.currentlyPlayingAt = manager.currentlyPlayingAt;
    return player;
  }
}
