import * as Fs from 'fs';
import * as Path from 'path';
import { Logger } from 'services';
import { Container } from 'typedi';
import { connect, getClient } from './connection';
import { load, MigrationSet } from './helper';

const logger = Container.get(Logger);

const STATE_STORE_PATH = Path.resolve(process.cwd(), 'build', '.migrate');
const MIGRATION_DIR = Path.resolve(process.cwd(), 'build', 'migrations');
const MIGRATION_COLLECTION = 'migrations';

const { argv } = require('yargs')
  .command({
    command: 'up',
    description: 'Migration up',
    handler: async () => {
      logger.info('Start migrating up.');
      const set = await preScript();
      logger.info('Initiated migration instance.');
      await set.up();
      logger.info('Finish migrating database.');
      await postScript(set);
    }
  })
  .command({
    command: 'down',
    description: 'Migration down',
    handler: async () => {
      logger.info('Start migrating down.');
      const set = await preScript();
      logger.info('Initiated migration instance.');
      await set.down();
      logger.info('Finish migrating database.');
      await postScript(set);
    }
  });

async function preScript() {
  const connection = await connect();
  try {
    const stateStore = await connection.collection(MIGRATION_COLLECTION).findOne({});
    if (stateStore) {
      Fs.writeFileSync(STATE_STORE_PATH, JSON.stringify(stateStore));
    }
  } catch (e) {
    logger.info('Migration table not found, start a fresh new migration.');
  }
  return load({
    stateStore: STATE_STORE_PATH,
    migrationsDirectory: MIGRATION_DIR,
    filterFunction: file => {
      logger.info(`Load migration file: ${file}`);
      return !!file;
    }
  });
}

async function postScript(set: MigrationSet) {
  logger.info('Start updating migration state.');

  const connection = await connect();
  try {
    await connection.dropCollection(MIGRATION_COLLECTION);
  } catch (e) {
    logger.info('Collection not found, keep creating collection');
  }
  await connection.createCollection(MIGRATION_COLLECTION);

  const state = await set.getStoreState();
  await connection.collection(MIGRATION_COLLECTION).insertOne(state);

  Fs.unlinkSync(STATE_STORE_PATH);

  const client = getClient();
  if (client) {
    await client.close();
    logger.info('Finish!');
  }
  process.exit();
}
