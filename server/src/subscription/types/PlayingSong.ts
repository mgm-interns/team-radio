import { ObjectType, Field } from 'type-graphql';
import { PlaylistSong } from 'entities';

@ObjectType()
export class PlayingSong {
  constructor(song: PlaylistSong, startedAt: number = Date.now()) {
    this.song = song;
    this.startedAt = startedAt;
  }

  @Field(type => PlaylistSong)
  song: PlaylistSong;

  @Field()
  startedAt: number;
}
