import { Field, InputType } from 'type-graphql';
import { BaseFilter } from './BaseFilter';

@InputType()
class StationFilterInput {
  @Field()
  id: string;
}

@InputType()
export class SongFilter extends BaseFilter {
  @Field(type => StationFilterInput, { nullable: true })
  station?: StationFilterInput;

  @Field({ nullable: true })
  stationId?: string;
}
