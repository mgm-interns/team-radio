import { User } from 'entities/user';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class StationSubscription {
  @Field()
  stationId: string;

  @Field()
  date: number;

  @Field(type => User)
  user: User;
}
