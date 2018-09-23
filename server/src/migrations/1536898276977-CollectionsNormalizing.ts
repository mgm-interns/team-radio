import * as Bcrypt from 'bcrypt-nodejs';
import * as Connection from 'config/migrations/connection';

export const up = async () => {
  const db = await Connection.getDB();
  const userCollection = db.collection('users');
  const stationCollection = db.collection('stations');
  const songCollection = db.collection('songs');
  const anonymousUser = await userCollection.insertOne({
    username: 'anonymous',
    email: 'anonymous.radio@gmail.com',
    password: Bcrypt.hashSync('123456', Bcrypt.genSaltSync(8))
  });
  await stationCollection.updateMany({ ownerId: null }, { $set: { ownerId: anonymousUser.insertedId.toString() } });
  await songCollection.updateMany({ creatorId: null }, { $set: { creatorId: anonymousUser.insertedId.toString() } });
};

export const down = async () => {
  const db = await Connection.getDB();
  const userCollection = db.collection('users');
  const stationCollection = db.collection('stations');
  const songCollection = db.collection('songs');
  const anonymousUser = await userCollection.findOne({ username: 'anonymous' });
  await stationCollection.updateMany({ ownerId: anonymousUser._id }, { $set: { ownerId: null } });
  await songCollection.updateMany({ creatorId: anonymousUser._id }, { $set: { creatorId: null } });
  await userCollection.deleteOne(anonymousUser);
};
