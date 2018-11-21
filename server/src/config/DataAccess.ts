import { Song, Station, User, DistinctSong } from 'entities';
import { Logger } from 'services';
import { Inject, Service } from 'typedi';
import {
  Connection,
  ConnectionOptions,
  createConnection,
  EntitySchema,
  getConnectionOptions,
  ObjectType
} from 'typeorm';

@Service()
export class DataAccess {
  @Inject()
  private logger: Logger;

  private _connection: Connection;

  public get connection(): Connection {
    return this._connection;
  }

  public getRepository<T>(customRepository: ObjectType<T>): T {
    return this.connection.getCustomRepository(customRepository);
  }

  public async connect() {
    try {
      const connectionOptions = await DataAccess.getConnectionOptions([User, Station, Song, DistinctSong]);
      this._connection = await createConnection(connectionOptions);
      return this.connection;
    } catch (e) {
      this.logger.error('Error while connecting to mongoDB', e);
      throw e;
    }
  }

  public static async getConnectionOptions(
    entities?: (Function | string | EntitySchema<any>)[]
  ): Promise<ConnectionOptions> {
    const defaultOptions = await getConnectionOptions();
    return { ...defaultOptions, entities };
  }
}
