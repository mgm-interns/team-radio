import { User } from 'entities';
import { UserNotFoundException } from 'exceptions';
import { ObjectId } from 'mongodb';
import { Logger } from 'services';
import { Inject, Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { TokenHelper } from 'utils';

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  @Inject()
  private logger: Logger;

  public async findById(id: string): Promise<User> {
    const user = await this.findOne({ where: { _id: new ObjectId(id) } });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  public async findByUsernameOrEmail({ username, email }: { username?: string; email?: string }): Promise<User> {
    let user;
    if (username) {
      user = await this.findOne({ where: { username } });
    }
    if (email) {
      user = await this.findOne({ where: { email } });
    }
    if (!user) throw new UserNotFoundException();
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
}
