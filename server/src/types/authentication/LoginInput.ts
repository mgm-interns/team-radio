import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';
import { User } from 'entities';
import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput implements Partial<User> {
  @IsOptional()
  @MinLength(6)
  @MaxLength(32)
  @Field({ nullable: true })
  username?: string;

  @IsOptional()
  @MinLength(6)
  @MaxLength(64)
  @IsEmail()
  @Field({ nullable: true })
  email?: string;

  @MinLength(6)
  @MaxLength(32)
  @Field()
  password: string;
}
