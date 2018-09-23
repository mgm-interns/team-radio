import * as Connection from 'config/migrations/connection';
import { ObjectID } from 'bson';

export const up = async () => {
  const db = await Connection.getDB();
  const userCollection = db.collection('users');
  const stationCollection = db.collection('stations');
  const stations = await stationCollection.find({}).toArray();
  await Promise.all(
    stations.map(station =>
      userCollection.updateOne(
        { _id: new ObjectID(station.ownerId) },
        {
          $push: {
            roles: {
              role: 'stationOwner',
              stationId: station._id.toString()
            }
          }
        }
      )
    )
  );
};

export const down = async () => {
  const db = await Connection.getDB();
  const userCollection = db.collection('users');
  await userCollection.updateMany(
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
