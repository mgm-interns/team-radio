import { Exception } from 'exceptions';
import { BAD_REQUEST } from 'http-status-codes';

export class BadRequestException extends Exception {
  constructor(message?: string) {
    super(message, BAD_REQUEST);
  }
}
