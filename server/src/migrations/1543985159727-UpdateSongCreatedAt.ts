import * as Connection from 'config/migrations/connection';

export const up = async () => {
  const db = await Connection.getDB();
  const songsCollection = db.collection('songs');
  await songsCollection.updateMany({}, { $set: { createdAt: Date.now() } });
};

export const down = async () => {
  const db = await Connection.getDB();
};
