import { Exception } from 'exceptions';
import { METHOD_NOT_ALLOWED } from 'http-status-codes';

export class MethodNotAllowedException extends Exception {
  constructor(message?: string) {
    super(message, METHOD_NOT_ALLOWED);
  }
}
