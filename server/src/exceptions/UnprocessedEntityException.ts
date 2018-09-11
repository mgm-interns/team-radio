import { Exception } from 'exceptions';
import { UNPROCESSABLE_ENTITY } from 'http-status-codes';
import { ValidationError } from 'class-validator';

export class UnprocessedEntityException extends Exception {
  constructor(message?: string, public validationErrors: ValidationError[] = []) {
    super(message, UNPROCESSABLE_ENTITY);
  }
}
