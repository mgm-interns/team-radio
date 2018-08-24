import { Station } from 'entities/station';
import { User } from 'entities/user';
import { Logger } from 'services/logger';
import { Inject, Service } from 'typedi';
import { Connection, ConnectionOptions, createConnection, EntitySchema, getConnectionOptions } from 'typeorm';
import { UsersWorker } from 'workers';

@Service()
export class DataAccess {
  @Inject()
  private logger: Logger;

  @Inject()
  private usersWorker: UsersWorker;

  private connection: Connection;

  public async connect() {
    try {
      const connectionOptions = await DataAccess.getConnectionOptions([User, Station]);
      this.connection = await createConnection(connectionOptions);
      return this.connection;
    } catch (e) {
      this.logger.error('Error while connecting to mongoDB', e);
      throw e;
    }
  }

  public async startWorkers() {
    return Promise.all([
      // start users worker, has to inject connection here
      this.usersWorker.start(this.connection)
      // Start other workers here
    ]);
  }

  public static async getConnectionOptions(
    entities?: (Function | string | EntitySchema<any>)[]
  ): Promise<ConnectionOptions> {
    const defaultOptions = await getConnectionOptions();
    return { ...defaultOptions, entities };
  }
}
