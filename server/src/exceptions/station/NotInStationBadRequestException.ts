import { BadRequestException } from '../BadRequestException';

export class NotInStationBadRequestException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'You need to join a station to perform this action.');
  }
}
