import { Identifiable, Styleable } from 'Common';
import { SimpleSong as SimpleSongItem } from './SimpleSong';

export namespace SongItem {
  export const SimpleSong = SimpleSongItem;

  export interface Props extends Identifiable, Styleable {
    song: {
      id: string;
      url: string;
      thumbnail: string;
      title: string;
      creatorId: string;
      createdAt: string;
      duration: number;
    };
    onClick?(): void;
  }
}
