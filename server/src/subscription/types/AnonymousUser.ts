import { IdentifiableUser } from 'config';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AnonymousUser implements IdentifiableUser {
  @Field({ nullable: true })
  clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  isAnonymous() {
    return true;
  }

  isUser() {
    return false;
  }
}
