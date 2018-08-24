import { IsArray, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'stations' })
export class Station {
  @Field(type => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Field()
  @IsNotEmpty()
  @Column()
  stationId: string;

  @Field()
  @IsNotEmpty()
  @Column()
  stationName: string;

  @Field()
  @IsNumber()
  @Column()
  createdAt: number;

  // TODO: Deal with it
  // @Field(type => [])
  // @IsArray()
  // @Column()
  // userPoints: [];

  // TODO: Deal with it
  // @Field(type => [])
  // @IsArray()
  // @Column()
  // playlist: [];

  @Field()
  @IsNumber()
  @Column()
  startingTime: number;

  @Field(type => ID)
  @ObjectIdColumn()
  ownerId: ObjectID;

  @Field()
  @Column()
  isPrivate: boolean;

  // TODO: Deal with it
  // @Field(type => [])
  // @Column()
  // chat: [];
}
