import { Exception } from 'exceptions';
import { UNAUTHORIZED } from 'http-status-codes';

export class UnauthorizedException extends Exception {
  constructor(message?: string) {
    super(message, UNAUTHORIZED);
  }
}
