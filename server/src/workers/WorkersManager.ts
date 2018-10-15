import { Inject, Service } from 'typedi';
import { UsersWorker } from './UsersWorker';

@Service()
export class WorkersManager {
  @Inject()
  private usersWorker: UsersWorker;

  public async start() {
    return Promise.all([
      // start users worker, has to inject connection here
      this.usersWorker.start()
      // Start other workers here
    ]);
  }
}
