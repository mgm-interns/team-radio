import { MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ChangePasswordInput {
  @MinLength(6)
  @MaxLength(32)
  @Field()
  password: string;
}
