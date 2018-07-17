import mongoose from 'mongoose';

const workerSchema = mongoose.Schema({
  finished_on: { type: Number, default: normalizeDate() },
  removed_stations: {
    type: [
      {
        station_name: { type: String },
        station_id: { type: String, require: true },
      },
    ],
  },
});

/* eslint-disable-next-line */
const Worker = (module.exports = mongoose.model('workers', workerSchema));

function normalizeDate(date = new Date()) {
  return parseInt(
    `${date.getFullYear()}${date.getMonth()}${date.getDate()}`,
    10,
  );
}

module.exports.normalizeDate = normalizeDate;
