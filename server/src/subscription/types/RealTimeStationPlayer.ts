import { PlaylistSong } from 'entities';
import { TimestampScalar } from 'scalars';
import { Field, Int, ObjectType } from 'type-graphql';
import { RealTimeStationPlayerManager } from '../station/RealTimeStationPlayerManager';

@ObjectType()
export class RealTimeStationPlayer {
  @Field(type => PlaylistSong, { nullable: true })
  public playing: PlaylistSong | null = null;

  @Field(type => TimestampScalar, { nullable: true })
  public startedAt: number | null = null;

  @Field(type => Int, { nullable: true })
  public currentlyPlayingAt: number | null = null;

  @Field(type => Int)
  public playlistCount: number = 0;

  @Field(type => String, { nullable: true })
  public nextSongThumbnail: string | null;

  static fromRealTimeStationPlayerManager(manager: RealTimeStationPlayerManager): RealTimeStationPlayer {
    const player = new RealTimeStationPlayer();
    if (manager.playing) {
      player.playing = manager.playing.song;
      player.startedAt = manager.playing.startedAt;
    }
    player.currentlyPlayingAt = manager.getCurrentlyPlayingAt();
    player.playlistCount = manager.playlist.length;
    // No playing song, but there is at least 1 song in playlist
    if (!player.playing && player.playlistCount > 0) {
      player.nextSongThumbnail = manager.playlist[0].highQualityThumbnail || manager.playlist[0].thumbnail;
    }
    return player;
  }
}
