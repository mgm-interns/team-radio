import * as Connection from 'config/migrations/connection';

export const up = async () => {
  const db = await Connection.getDB();
  const stationCollection = db.collection('stations');
  const songCollection = db.collection('songs');
  const stations = await stationCollection.find({ 'playlist.0.song_id': { $exists: true } }).toArray();
  await Promise.all(
    stations.map(async station => {
      const playlist = station.playlist.map((song: any) => {
        song['stationId'] = station._id;
        renameProperty(song, 'song_id', 'songId');
        renameProperty(song, 'created_date', 'createdAt');
        renameProperty(song, 'is_played', 'isPlayed');
        renameProperty(song, 'up_vote', 'upVotes');
        renameProperty(song, 'down_vote', 'downVotes');
        renameProperty(song, 'creator', 'creatorId');
        return song;
      });

      await songCollection.insertMany(playlist);
    })
  );
  await stationCollection.updateMany({ playlist: { $exists: true } }, { $unset: { playlist: true } });
};

export const down = async () => {
  const db = await Connection.getDB();
  const stationCollection = db.collection('stations');
  const songCollection = db.collection('songs');
  const stations = await stationCollection.find({}).toArray();
  await Promise.all(
    stations.map(async station => {
      const playlist = await songCollection
        .find({ stationId: station._id })
        .map(song => {
          delete song['stationId'];
          renameProperty(song, 'songId', 'song_id');
          renameProperty(song, 'createdAt', 'created_date');
          renameProperty(song, 'isPlayed', 'is_played');
          renameProperty(song, 'upVotes', 'up_vote');
          renameProperty(song, 'downVotes', 'down_vote');
          renameProperty(song, 'creatorId', 'creator');
          return song;
        })
        .toArray();

      await stationCollection.updateOne({ _id: station._id }, { $set: { playlist } });
    })
  );
  await db.dropCollection('songs');
};

function renameProperty(item: { [key: string]: any }, oldPropName: string, newPropName: string) {
  if (item[oldPropName] !== undefined) {
    item[newPropName] = item[oldPropName];
    delete item[oldPropName];
  }
}
