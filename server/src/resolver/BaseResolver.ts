import { BaseEntity } from 'entities';
import { FieldResolver, Resolver, Root } from 'type-graphql';

@Resolver(of => BaseEntity)
export abstract class BaseResolver<Entity extends BaseEntity> {
  @FieldResolver()
  id(@Root() entity: Entity): string {
    return entity._id ? entity._id.toString() : '';
  }
}
