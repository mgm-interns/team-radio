import { UserRepository } from 'repositories/user';
import { Logger } from 'services';
import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseWorker } from '.';

@Service()
export class UsersWorker implements BaseWorker {
  @Inject()
  private logger: Logger;

  @InjectRepository()
  private userRepository: UserRepository;

  /**
   * Add a random auth token to user which has missing authToken field
   */
  async start() {
    try {
      const users = await this.userRepository.find();
      users.forEach(user => {
        if (!user) return;
        if (!user.authToken || (user.authToken && (!user.authToken.token || !user.authToken.refreshToken))) {
          user.generateToken();
          this.logger.info('user', user);
          this.userRepository.save(user);
        }
      });
      this.logger.info('Update auth token for system users successful!');
    } catch (e) {
      this.logger.error('Error', e);
      throw e;
    }
  }
}
