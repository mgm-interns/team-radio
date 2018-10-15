import { ObjectType } from 'type-graphql';
import { Entity } from 'typeorm';
import { Song } from './Song';

@ObjectType()
@Entity({ name: 'songs' })
export class PlaylistSong extends Song {
  public static fromSong(song: Song) {
    const playlistSong = new PlaylistSong();
    Object.assign(playlistSong, song);
    return playlistSong;
  }
}
