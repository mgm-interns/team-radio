import { Exception } from 'exceptions';
import { UNPROCESSABLE_ENTITY } from 'http-status-codes';

export class UnprocessedEntityException extends Exception {
  constructor(message?: string) {
    super(message, UNPROCESSABLE_ENTITY);
  }
}
