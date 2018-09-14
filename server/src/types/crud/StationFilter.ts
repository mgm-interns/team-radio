import { Field, InputType } from 'type-graphql';
import { BaseFilter } from './BaseFilter';

@InputType()
class OwnerFilterInput {
  @Field()
  id: string;
}

@InputType()
export class StationFilter extends BaseFilter {
  @Field(type => OwnerFilterInput, { nullable: true })
  owner?: OwnerFilterInput;

  @Field({ nullable: true })
  ownerId?: string;
}
