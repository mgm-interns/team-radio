import { UserRepository } from 'repositories';
import { Logger } from 'services';
import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { IBaseWorker } from './IBaseWorker';

@Service()
export class UsersWorker implements IBaseWorker {
  @Inject()
  private logger: Logger;

  @InjectRepository()
  private userRepository: UserRepository;

  public async start() {
    try {
      const users = await this.userRepository.find();

      this.logger.info('Finish executing users worker');
    } catch (e) {
      this.logger.error('Error', e);
      throw e;
    }
  }
}
