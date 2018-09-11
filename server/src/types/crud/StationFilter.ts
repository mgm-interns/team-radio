import { Field, InputType } from 'type-graphql';
import { BaseFilter } from './BaseFilter';

@InputType()
export class StationFilter extends BaseFilter {
  @Field({ nullable: true })
  ownerId?: string;
}
