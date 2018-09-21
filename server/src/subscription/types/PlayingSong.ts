import { ObjectType, Field } from 'type-graphql';
import { PlaylistSong } from 'entities';

@ObjectType()
export class PlayingSong {
  @Field(type => PlaylistSong)
  song: PlaylistSong;

  @Field()
  startedAt: number;
}
