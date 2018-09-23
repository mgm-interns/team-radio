import * as Bcrypt from 'bcrypt-nodejs';
import * as Connection from 'config/migrations/connection';

export const up = async () => {
  const db = await Connection.getDB();
  const userCollection = db.collection('users');
  const password = Bcrypt.hashSync('123456', Bcrypt.genSaltSync(8));
  const roles = [{ role: 'admin' }];
  await userCollection.updateMany(
    { email: { $in: ['pvtri96@gmail.com', 'dungle1811@gmail.com'] } },
    { $set: { password, roles } }
  );
};

export const down = async () => {
  const db = await Connection.getDB();
  const userCollection = db.collection('users');
  await userCollection.updateMany({ roles: { $exists: true } }, { $unset: { roles: true } });
};
