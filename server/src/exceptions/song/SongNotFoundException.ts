import { NotFoundException } from '../NotFoundException';

export class SongNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Song not found.');
  }
}
