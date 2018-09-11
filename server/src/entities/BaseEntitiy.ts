import { validate } from 'class-validator';
import { ObjectType } from 'type-graphql';
import { Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity()
export class BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  public async validate() {
    return validate(this);
  }
}
