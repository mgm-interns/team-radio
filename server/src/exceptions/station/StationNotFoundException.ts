import { NotFoundException } from '../NotFoundException';

export class StationNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Station not found.');
  }
}
