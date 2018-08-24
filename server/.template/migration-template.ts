import * as Connection from 'config/migrations/connection';

export const up = async () => {
  const db = await Connection.getDB();
};

export const down = async () => {
  const db = await Connection.getDB();
};
