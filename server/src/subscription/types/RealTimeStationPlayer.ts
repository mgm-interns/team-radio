import { ObjectType, Field } from 'type-graphql';
import { PlaylistSong } from 'entities';
import { PlayingSong } from '.';

@ObjectType()
export class RealTimeStationPlayer {
  private _playlist: PlaylistSong[] = [];

  @Field(type => [PlaylistSong])
  public get playlist(): PlaylistSong[] {
    return this._playlist.sort((s1, s2) => s1.upVotes.length - s2.downVotes.length);
  }

  public set playlist(playlist: PlaylistSong[]) {
    this._playlist = playlist;
  }

  @Field(type => PlayingSong)
  playing: PlayingSong;

  public start() {}
  public next() {}
  public pause() {}
  public stop() {}
}
