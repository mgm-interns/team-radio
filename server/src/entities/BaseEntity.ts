import { validate } from 'class-validator';
import { ObjectType, Field } from 'type-graphql';
import { Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { ValidatableEntity } from './ValidatableEntity';

@ObjectType()
@Entity()
export class BaseEntity extends ValidatableEntity {
  @ObjectIdColumn()
  private _id: ObjectID;

  @Field(type => String)
  public get id() {
    return this._id.toHexString();
  }

  public set id(id: string) {
    this._id = new ObjectID(id);
  }

  // tslint:disable-next-line function-name
  public UNSAFE_getObjectId() {
    return this._id;
  }
}
