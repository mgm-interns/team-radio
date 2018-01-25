let Station = null;

export default (query, limit) =>
  new Promise(resolve => {
    const regex = new RegExp('^' + query);
    // Station.find({ $text: { $search: query } }) // Full text search
    Station.find({
      $or: [
        { $text: { $search: query } },
        { station_name: { $regex: regex } },
        { station_id: { $regex: regex } },
      ],
    }) // Full text search
      .select({ station_name: 1, station_id: 1 }) // What fields will be select
      .limit(limit)
      .exec((err, result) => {
        if (err) return resolve([]);
        return resolve(result);
      });
  });

export const attachStationData = _stationModel => {
  Station = _stationModel;
};
