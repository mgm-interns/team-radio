import { IAuthenticatedContext, IContext } from 'config';
import { AuthToken, User } from 'entities';
import { BadRequestException, ForbiddenException, UserNotFoundException } from 'exceptions';
import { LoginInput, RegisterInput } from 'inputs';
import { UserRepository } from 'repositories';
import { Logger } from 'services';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseResolver } from '..';

@Resolver(of => User)
export class AuthenticationResolver extends BaseResolver {
  @Inject()
  private logger: Logger;

  @InjectRepository()
  private userRepository: UserRepository;

  @Authorized()
  @Query(returns => User)
  public async currentUser(@Ctx() context: IAuthenticatedContext): Promise<User> {
    return context.user as User;
  }

  @Mutation(returns => AuthToken)
  public async login(
    @Arg('credential', type => LoginInput) credential: LoginInput,
    @Ctx() context: IContext
  ): Promise<AuthToken> {
    if (context.user && context.user.isUser()) throw new BadRequestException('Already logged in. Please logout first.');
    if (credential.email && credential.username) throw new ForbiddenException('Only login with username OR email');
    if (!credential.email && !credential.username) throw new ForbiddenException('Username OR email is required');

    const { email, username, password } = credential;
    const user = await this.userRepository.findByUsernameOrEmail({ username, email });
    if (!user || !user.isValidPassword(password)) throw new UserNotFoundException();
    user.generateToken();
    const { authToken } = await this.userRepository.save(user);
    return authToken;
  }

  @Mutation(returns => User)
  public async register(
    @Arg('user', type => RegisterInput) input: RegisterInput,
    @Ctx() context: IContext
  ): Promise<User> {
    if (context.user && context.user.isUser()) throw new BadRequestException('Already logged in. Please logout first.');
    if (!input.email && !input.username) throw new ForbiddenException('Username OR email is required');

    const { username, email, password } = input;
    const existedUser = await this.userRepository.findByUsernameOrEmail({ email, username });
    if (existedUser) throw new ForbiddenException('Username or Email has been taken.');

    const user = this.userRepository.create(input);
    user.generatePassword(password);
    if (!username) {
      user.generateUsernameFromEmail();
    }
    // Generate other information
    user.reputation = 0;

    return this.userRepository.save(user);
  }
}
