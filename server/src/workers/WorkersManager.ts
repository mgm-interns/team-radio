import { Inject, Service } from 'typedi';
import { UsersWorker } from '.';

@Service()
export class WorkersManager {
  @Inject()
  private usersWorker: UsersWorker;

  async start() {
    return Promise.all([
      // start users worker, has to inject connection here
      this.usersWorker.start()
      // Start other workers here
    ]);
  }
}
