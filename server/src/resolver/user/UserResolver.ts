import { User } from 'entities';
import { UserNotFoundException } from 'exceptions';
import { UserRepository } from 'repositories';
import { Logger } from 'services';
import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseResolver } from '..';

@Resolver(of => User)
export class UserResolver extends BaseResolver {
  @Inject()
  private logger: Logger;

  @InjectRepository()
  private userRepository: UserRepository;

  @Authorized()
  @Query(returns => [User], { description: 'Get all the users in system.' })
  public async users(): Promise<User[]> {
    return this.userRepository.find({});
  }

  @Query(returns => User, { description: 'Get user by id' })
  public async user(@Arg('id') id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException();
    return user;
  }
}
