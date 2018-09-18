import { User, AuthToken } from 'entities';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class LoggedInUser extends User {
  @Field(type => AuthToken)
  authToken: AuthToken;

  public static fromUser(user: User) {
    return Object.assign(new LoggedInUser(), user);
  }
}
