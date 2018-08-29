import { User } from 'entities';
import { UserNotFoundException } from 'exceptions/user';
import { UserRepository } from 'repositories/user';
import { Logger } from 'services/logger';
import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Resolver(of => User)
export class UserResolver {
  @Inject()
  private logger: Logger;

  @InjectRepository(User)
  private userRepository: UserRepository;

  @Authorized()
  @Query(returns => [User], { description: 'Get all the users in system.' })
  public async users(): Promise<User[]> {
    return this.userRepository.find({});
  }

  @Query(returns => User)
  public async user(@Arg('id') id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException();
    return user;
  }
}
