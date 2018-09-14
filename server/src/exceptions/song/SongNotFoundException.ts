import { NotFoundException } from 'exceptions';

export class SongNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Song not found.');
  }
}
