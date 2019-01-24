import { Db, MongoClient } from 'mongodb';

let client: MongoClient | undefined;

export const connect = async () => {
  client = await MongoClient.connect(getConnectionString(), { useNewUrlParser: true });
  return client.db(process.env.TYPEORM_DATABASE);
};

export const getClient = () => client;

export const getDB = async (): Promise<Db> => {
  if (client) {
    return client.db(process.env.TYPEORM_DATABASE);
  }
  return connect();
};

function getConnectionString() {
  const USERNAME = process.env.TYPEORM_USERNAME;
  const PASSWORD = process.env.TYPEORM_PASSWORD;
  const HOST = process.env.TYPEORM_HOST;
  const PORT = process.env.TYPEORM_PORT;
  const DATABASE = process.env.TYPEORM_DATABASE;
  return `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
}
