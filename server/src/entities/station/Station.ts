import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength, MinLength, NotContains } from 'class-validator';
import slugify from 'slugify';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '..';

@ObjectType()
@Entity({ name: 'stations' })
export class Station extends BaseEntity {
  @NotContains(' ')
  @IsNotEmpty()
  @Field()
  @Column()
  stationId: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @Field()
  @Column()
  stationName: string;

  @IsNumber()
  @Field()
  @Column()
  createdAt: number = new Date().getTime();

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

  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  @Column({ nullable: true })
  startingTime: number;

  @Field()
  @Column()
  ownerId: string;

  @IsBoolean()
  @Field()
  @Column()
  isPrivate: boolean = false;

  // TODO: Deal with it
  // @Field(type => [])
  // @Column()
  // chat: [];

  public generateStationId() {
    this.stationId = slugify(this.stationName, {
      lower: true
    });
  }
}
