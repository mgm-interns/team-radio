import { Field, InputType } from 'type-graphql';

@InputType()
export class DistinctSongFilter {
  @Field()
  stationId: string;
}
