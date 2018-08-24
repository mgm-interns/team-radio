import * as Connection from 'config/migrations/connection';

export const up = async () => {
  const db = await Connection.getDB();
  const collection = db.collection('users');
  await collection.updateMany({ avatar_url: { $exists: true } }, { $rename: { avatar_url: 'avatarUrl' } });
  await collection.updateMany({ cover_url: { $exists: true } }, { $rename: { cover_url: 'coverUrl' } });
  await collection.updateMany({ facebook_id: { $exists: true } }, { $rename: { facebook_id: 'facebookId' } });
  await collection.updateMany({ google_id: { $exists: true } }, { $rename: { google_id: 'googleId' } });
  await collection.updateMany(
    { favourited_songs: { $exists: true } },
    { $rename: { favourited_songs: 'favouriteSongs' } }
  );
  await collection.updateMany({ my_station: { $exists: true } }, { $rename: { my_station: 'myStations' } });
  await collection.updateMany({ is_password: { $exists: true } }, { $unset: { is_password: true } });
  await collection.updateMany({ token_reset_password: { $exists: true } }, { $unset: { token_reset_password: true } });
};

export const down = async () => {
  const db = await Connection.getDB();
  const collection = db.collection('users');
  await collection.updateMany({ avatarUrl: { $exists: true } }, { $rename: { avatarUrl: 'avatar_url' } });
  await collection.updateMany({ coverUrl: { $exists: true } }, { $rename: { coverUrl: 'cover_url' } });
  await collection.updateMany({ facebookId: { $exists: true } }, { $rename: { facebookId: 'facebook_d' } });
  await collection.updateMany({ googleId: { $exists: true } }, { $rename: { googleId: 'google_id' } });
  await collection.updateMany(
    { favouriteSongs: { $exists: true } },
    { $rename: { favouriteSongs: 'favourited_songs' } }
  );
  await collection.updateMany({ myStations: { $exists: true } }, { $rename: { myStations: 'my_station' } });
  await collection.updateMany({}, { $set: { is_password: true } });
  await collection.updateMany({}, { $set: { token_reset_password: '' } });
};
