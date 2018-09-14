import { ObjectType } from 'type-graphql';
import { Entity } from 'typeorm';
import { Song } from '.';

@ObjectType()
@Entity({ name: 'songs' })
export class HistorySong extends Song {
  public static fromSong(song: Song) {
    const historySong = new HistorySong();
    Object.assign(historySong, song);
    return historySong;
  }
}
