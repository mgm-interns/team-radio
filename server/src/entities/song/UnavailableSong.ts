import { IsUrl } from 'class-validator';
import { Field, ObjectType, Int } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@ObjectType()
@Entity({ name: 'unavailableSongs' })
export class UnavailableSong extends BaseEntity {
  @IsUrl()
  @Column()
  @Field()
  url: string;

  @Column()
  @Field(type => Int)
  errorCode: number;
}

export enum UnavailableSongStatus {
  NOT_FOUND = 404,
  RESTRICTED_BY_OWNER = 150
}
