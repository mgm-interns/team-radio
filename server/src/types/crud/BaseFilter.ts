import { Field, InputType } from 'type-graphql';

@InputType()
export class BaseFilter {
  @Field({ nullable: true, description: 'Query string for text search' })
  q?: string;

  @Field(type => [String], { nullable: true, description: 'Array of ID, helpful for reference search' })
  ids?: string[];
}
