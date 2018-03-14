let Station = null;

export default (query, limit) =>
  new Promise(resolve => {
    /**
     * Full text search using text indexes: Best performance
     * Problem: Cannot search part of string like `like` in SQL DB
     * i.e: Cannot use `hel`, `llo` to search something like `Hello`
     */
    // Station.find({ $text: { $search: query } })

    /**
     * Search without text indexes: Bad performance
     * Problem: Bad performance, this query runs too slow
     */
    Station.find({
      $or: [
        /**
         * Define search rule: Search by station_name or station_id
         */
        { station_name: { $regex: new RegExp(query, 'i') } },
        { station_id: { $regex: new RegExp(query, 'i') } },
      ],
    })
      .select({
        station_name: 1,
        station_id: 1,
        is_private: 1,
        owner_id: 1,
        is_delete: 1,
        skip_by_station_owner: 1,
      }) // What fields will be select
      .limit(limit)
      .exec((err, result) => {
        if (err) return resolve([]);
        return resolve(result);
      });
  });

export const attachStationData = _stationModel => {
  Station = _stationModel;
};
