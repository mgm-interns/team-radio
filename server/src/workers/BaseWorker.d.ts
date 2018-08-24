import { Connection } from 'typeorm';

export interface BaseWorker {
  start(connection: Connection): void;
}
