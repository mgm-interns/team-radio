import { validate } from 'class-validator';

export class ValidatableEntity {
  public async validate() {
    return validate(this);
  }
}
