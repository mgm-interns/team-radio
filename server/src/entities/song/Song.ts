import { IsUrl, IsOptional } from 'class-validator';
import { TimestampScalar } from 'scalars';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@ObjectType()
@Entity({ name: 'songs' })
export class Song extends BaseEntity {
  @Column()
  @Field()
  songId: string;

  @Column()
  @Field()
  title: string;

  @IsUrl()
  @Column()
  @Field()
  url: string;

  @Column()
  @Field()
  creatorId: string;

  @Column()
  @Field()
  stationId: string;

  @Column()
  @Field()
  duration: number;

  @IsUrl()
  @Column()
  @Field()
  thumbnail: string;

  @IsUrl()
  @IsOptional()
  @Column({ nullable: true })
  @Field({ nullable: true })
  highQualityThumbnail?: string;

  @Column()
  @Field()
  isPlayed: boolean = false;

  @Field(type => TimestampScalar)
  @Column()
  createdAt: number = Date.now();

  @Column()
  @Field(type => [String])
  upVotes: string[] = [];

  @Column()
  @Field(type => [String])
  downVotes: string[] = [];
}
