import { Identifiable, Styleable } from 'Common';
import { SimpleSong } from './SimpleSong';

export const SongItem = {
  SimpleSong
};

export interface SongItemProps extends Identifiable, Styleable {
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
