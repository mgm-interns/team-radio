import * as Connection from 'config/migrations/connection';

export const up = async () => {
  const db = await Connection.getDB();
  const userCollection = db.collection('users');
  await userCollection.updateMany({ roles: { $exists: false } }, { $set: { roles: [] } });
};

export const down = async () => {
  const db = await Connection.getDB();
  const userCollection = db.collection('users');
  await userCollection.updateMany({ roles: { $exists: true } }, { $unset: { roles: [] } });
};
