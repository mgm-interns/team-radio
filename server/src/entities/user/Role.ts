import { ObjectType, Field } from 'type-graphql';
import { Entity, Column, ObjectID } from 'typeorm';
import { ObjectId } from 'bson';

@ObjectType()
@Entity()
export class Role {
  @Field()
  @Column()
  role: UserRole;

  @Field({ nullable: true })
  @Column({ nullable: true })
  stationId?: string;

  public isMatchedWithStationId(stationId: string | ObjectID) {
    if (this.stationId) {
      return new ObjectId(this.stationId).equals(stationId.toString());
    }
    return false;
  }
}

export enum UserRole {
  ADMIN = 'admin',
  STATION_OWNER = 'stationOwner'
}
