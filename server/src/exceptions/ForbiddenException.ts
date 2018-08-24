import { Exception } from 'exceptions';
import { FORBIDDEN } from 'http-status-codes';

export class ForbiddenException extends Exception {
  constructor(message?: string) {
    super(message, FORBIDDEN);
  }
}
