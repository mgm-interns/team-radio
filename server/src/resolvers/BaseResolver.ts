import { BaseEntity } from 'entities';
import { Resolver } from 'type-graphql';

@Resolver(of => BaseEntity)
export abstract class BaseResolver<Entity = BaseEntity> {}
