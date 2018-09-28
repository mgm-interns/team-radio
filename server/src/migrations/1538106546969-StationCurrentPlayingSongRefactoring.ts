import * as Connection from 'config/migrations/connection';

export const up = async () => {
  const db = await Connection.getDB();
  const stationsCollection = db.collection('stations');
  stationsCollection.updateMany({}, { $set: { currentPlayingSongId: null } });
};

export const down = async () => {
  const db = await Connection.getDB();
  const stationsCollection = db.collection('stations');
  stationsCollection.updateMany({}, { $unset: { currentPlayingSongId: true } });
};
