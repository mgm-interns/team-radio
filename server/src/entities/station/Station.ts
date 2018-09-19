import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, MaxLength, MinLength, NotContains } from 'class-validator';
import { User } from 'entities';
import slugify from 'slugify';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ObjectID } from 'typeorm';
import { BaseEntity } from '..';
import { UserRole } from '../user';

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

  @Field()
  @Column()
  createdAt: number = new Date().getTime();

  // TODO: Deal with it
  // @Field(type => [])
  // @IsArray()
  // @Column()
  // userPoints: [];

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

  public isOwner(user: User) {
    if (user.roles) {
      const matchedRole = user.roles.find(
        role =>
          // The owner of stations
          (role.role === UserRole.STATION_OWNER && role.isMatchedWithStationId(this._id)) ||
          // System administrator is also the owner
          role.role === UserRole.ADMIN
      );
      if (matchedRole) {
        return true;
      }
    }
    return false;
  }
}
