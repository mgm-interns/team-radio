import { validate } from 'class-validator';
import { ObjectType, Field } from 'type-graphql';
import { Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity()
export class BaseEntity {
  @ObjectIdColumn()
  private _id: ObjectID;

  @Field(type => String)
  public get id() {
    return this._id;
  }

  public set id(id: ObjectID) {
    this._id = id;
  }

  public async validate() {
    return validate(this);
  }
}
