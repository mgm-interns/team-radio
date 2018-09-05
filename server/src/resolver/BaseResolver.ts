import { BaseEntity } from 'entities';
import { FieldResolver, Resolver, Root } from 'type-graphql';

@Resolver(of => BaseEntity)
export class BaseResolver {
  @FieldResolver()
  id(@Root() entity: BaseEntity): string {
    return entity._id.toString();
  }
}
