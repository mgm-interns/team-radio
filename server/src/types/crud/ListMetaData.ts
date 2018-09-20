import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class ListMetaData {
  constructor(count: number) {
    this.count = count;
  }

  @Field(type => Int)
  count: number;
}
