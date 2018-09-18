import * as Connection from 'config/migrations/connection';

export const up = async () => {
  const db = await Connection.getDB();
  const userCollection = db.collection('users');
  const stationCollection = db.collection('stations');
  const stations = await stationCollection.find({}).toArray();
  stations.forEach(station => {
    userCollection.updateOne(
      { _id: station.ownerId },
      {
        $push: {
          roles: {
            role: 'stationOwner',
            stationId: station._id
          }
        }
      }
    );
  });
};

export const down = async () => {
  const db = await Connection.getDB();
  const userCollection = db.collection('users');
  userCollection.updateMany(
    { roles: { $exists: true } },
    {
      $pull: {
        roles: {
          role: 'stationOwner'
        }
      }
    }
  );
};
