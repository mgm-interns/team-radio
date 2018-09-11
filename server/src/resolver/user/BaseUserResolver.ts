import { User } from 'entities';
import { UserRepository } from 'repositories';
import { BaseResolver } from 'resolver';
import { Logger } from 'services';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Resolver(of => User)
export abstract class BaseUserResolver extends BaseResolver<User> {
  @Inject()
  protected logger: Logger;

  @InjectRepository()
  protected userRepository: UserRepository;

  /**
   * Define user roles
   */
  @FieldResolver({ name: 'Roles' })
  role(@Root() user: User): number {
    return 1;
  }
}
