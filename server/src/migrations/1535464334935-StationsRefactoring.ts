import * as Connection from 'config/migrations/connection';

export const up = async () => {
  const db = await Connection.getDB();
  const collection = db.collection('stations');
  await collection.updateMany({ station_id: { $exists: true } }, { $rename: { station_id: 'stationId' } });
  await collection.updateMany({ station_name: { $exists: true } }, { $rename: { station_name: 'stationName' } });
  await collection.updateMany({ created_date: { $exists: true } }, { $rename: { created_date: 'createdAt' } });
  await collection.updateMany({ user_points: { $exists: true } }, { $rename: { user_points: 'userPoints' } });
  await collection.updateMany({ starting_time: { $exists: true } }, { $rename: { starting_time: 'startingTime' } });
  await collection.updateMany({ owner_id: { $exists: true } }, { $rename: { owner_id: 'ownerId' } });
  await collection.updateMany({ is_private: { $exists: true } }, { $rename: { is_private: 'isPrivate' } });
  await collection.updateMany({ is_delete: { $exists: true } }, { $unset: { is_delete: true } });
};

export const down = async () => {
  const db = await Connection.getDB();
  const collection = db.collection('stations');
  await collection.updateMany({ stationId: { $exists: true } }, { $rename: { stationId: 'station_id' } });
  await collection.updateMany({ stationName: { $exists: true } }, { $rename: { stationName: 'station_name' } });
  await collection.updateMany({ createdAt: { $exists: true } }, { $rename: { createdAt: 'created_date' } });
  await collection.updateMany({ userPoints: { $exists: true } }, { $rename: { userPoints: 'user_points' } });
  await collection.updateMany({ startingTime: { $exists: true } }, { $rename: { startingTime: 'starting_time' } });
  await collection.updateMany({ ownerId: { $exists: true } }, { $rename: { ownerId: 'owner_id' } });
  await collection.updateMany({ isPrivate: { $exists: true } }, { $rename: { isPrivate: 'is_private' } });
  await collection.updateMany({}, { $set: { is_delete: false } });
};
