import { Field, InputType } from 'type-graphql';

@InputType()
export class BaseFilter {
  @Field({ nullable: true })
  q?: string;

  @Field(type => [String], { nullable: true })
  ids?: string[];
}
