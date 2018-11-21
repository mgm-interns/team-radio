import { ObjectType, Field } from 'type-graphql';
import { BaseEntity } from '../BaseEntity';
import { Entity, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'songs' })
export class DistinctSong extends BaseEntity {
  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  url: string;

  @Column()
  @Field()
  duration: number;

  @Column()
  @Field()
  thumbnail: string;

  @Column()
  @Field()
  isPlayed: boolean;

  public static fromObject(object: object) {
    return Object.assign(new DistinctSong(), object);
  }
}
