import { NotFoundException } from 'exceptions';

export class UserNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'User not found.');
  }
}
