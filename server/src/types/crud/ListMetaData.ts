import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ListMetaData {
  constructor(count: number) {
    this.count = count;
  }

  @Field()
  count: number;
}
