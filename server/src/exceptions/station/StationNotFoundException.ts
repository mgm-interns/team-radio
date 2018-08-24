import { NotFoundException } from 'exceptions';

export class StationNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Station not found.');
  }
}
