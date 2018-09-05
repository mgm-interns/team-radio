import { User } from 'entities';
import { UserNotFoundException } from 'exceptions';
import { RegisterInput } from 'inputs/authentication';
import { Logger } from 'services';
import { Inject, Service } from 'typedi';
import { EntityRepository } from 'typeorm';
import { TokenHelper } from 'utils';
import { BaseRepository } from '..';

@Service()
@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  @Inject()
  private logger: Logger;

  public async findByUsernameOrEmail({
    username,
    email
  }: {
    username?: string;
    email?: string;
  }): Promise<User | undefined> {
    let user;
    if (username) {
      user = await this.findOne({ where: { username } });
    }
    if (email) {
      user = await this.findOne({ where: { email } });
    }
    return user;
  }

  public async findByAuthToken(token: string): Promise<User> {
    const user = await this.findOne({ where: { 'authToken.token': token } });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  public updateTokenLifeTime(user: User): Promise<User> {
    user.authToken.expiredAt = TokenHelper.generateExpiredTime();
    user.authToken.refreshTokenExpiredAt = TokenHelper.generateRefreshTokenExpiredTime();

    return this.save(user);
  }

  public createFromRegisterInput(input: RegisterInput): User {
    const { username, password } = input;

    const user = this.create(input);
    user.generatePassword(password);
    if (!username) {
      user.generateUsernameFromEmail();
    }
    // Generate other information
    user.reputation = 0;
    return user;
  }
}
