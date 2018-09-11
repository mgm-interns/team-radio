import * as Connection from 'config/migrations/connection';

export const up = async () => {
  const db = await Connection.getDB();
  const collection = db.collection('users');
  await collection.createIndex({
    username: 'text',
    email: 'text',
    city: 'text',
    country: 'text',
    firstname: 'text',
    lastname: 'text'
  });
};

export const down = async () => {
  const db = await Connection.getDB();
  const collection = db.collection('users');
  const fields = ['username', 'email', 'city', 'country', 'firstname', 'lastname'];
  const fieldsIndex = fields.reduce((prev, curr) => `${prev}${curr}_text_`, '').slice(0, -1);
  await collection.dropIndex(fieldsIndex);
};
