import { Exception } from 'exceptions';
import { NOT_FOUND } from 'http-status-codes';

export class NotFoundException extends Exception {
  constructor(message?: string) {
    super(message, NOT_FOUND);
  }
}
