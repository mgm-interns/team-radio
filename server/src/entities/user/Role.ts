import { ObjectType, Field } from 'type-graphql';
import { Entity, Column, ObjectID } from 'typeorm';

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
      const normalizedId = stationId instanceof ObjectID ? stationId.toString() : stationId;
      return this.stationId === normalizedId;
    }
    return false;
  }
}

export enum UserRole {
  ADMIN = 'admin',
  STATION_OWNER = 'stationOwner'
}
