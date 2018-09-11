import * as Connection from 'config/migrations/connection';

export const up = async () => {
  const db = await Connection.getDB();
  const collection = db.collection('stations');
  await collection.createIndex({
    stationId: 'text',
    stationName: 'text'
  });
};

export const down = async () => {
  const db = await Connection.getDB();
  const collection = db.collection('stations');
  const fields = ['stationId', 'stationName'];
  const fieldsIndex = fields.reduce((prev, curr) => `${prev}${curr}_text_`, '').slice(0, -1);
  await collection.dropIndex(fieldsIndex);
};
