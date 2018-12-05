import { ValidatableEntity } from '../ValidatableEntity';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class DistinctSong extends ValidatableEntity {
  @Field()
  title: string;

  @Field()
  url: string;

  @Field()
  duration: number;

  @Field()
  thumbnail: string;

  @Field()
  isPlayed: boolean;

  @Field()
  createdAt: number;

  @Field()
  stationId: string;

  @Field()
  creatorId: string;

  public static fromObject(object: object) {
    return Object.assign(new DistinctSong(), object);
  }
}
