import { InputType } from 'type-graphql';
import { LoginInput } from '.';

@InputType()
export class RegisterInput extends LoginInput {
  // TODO: maybe add some other information: bio, avatar, birthday,...
}
