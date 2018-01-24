import textSearch from 'mongoose-text-search';

let stationSchema = null;
let Station = null;

/**
 * mongoose-text-search supports passing an options object as the second argument.
 *
 * project: select which fields to return (mongoose field selection syntax supported)
 * filter: declare an additional query matcher using find syntax (arguments are cast according to the schema).
 * limit: maximum number of documents (mongodb default is 100)
 * language: change the search language
 * lean: Boolean: if true, documents are not cast to mongoose documents (default false)
 */
const options = {
  project: '-created', // do not include the `created` property
  filter: { likes: { $gt: 1000000 } }, // casts queries based on schema
  limit: 10,
  language: 'english',
  lean: false,
};

export const searchStationByName = async (stationName, limit) => {
  // Classical way
  return new Promise(resolve => {
    Station.find(
      { station_name: { $regex: '.*' + stationName + '.*' } }, // Find by...
      'station_name created_date station_id', // Fields to find
      (err, stations) => {
        // Callback handle
        if (err) return resolve([]);
        return resolve(stations);
      },
    ).limit(limit);
  });

  // Use node module
  // Station.textSearch(stationName, options, (err, result) => {
  //   if (err) {
  //     console.log('Error ', err);
  //   }
  //   console.log('Search result: ', result);
  // });
};

export const attachStationData = (_stationSchema, _stationModel) => {
  stationSchema = _stationSchema;
  Station = _stationModel;
  _prepareSearchEnvironment();
};

const _prepareSearchEnvironment = () => {
  // Add text index
  stationSchema.index({ station_name: 'text', station_id: 'text' });

  // give text search capabilities for schema
  stationSchema.plugin(textSearch);
};
