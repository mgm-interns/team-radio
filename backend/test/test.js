/* eslint-disable */
var stationController = require('../src/controllers/station');

// create a station
var station = {};
module.exports = station;

station.addStation = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    let station = await stationController.addStation(req.body.station_name, req.body.user_id, req.body.is_private);
    res.status(200).json(station);

};

station.getAllStationDetails = async function (req, res) {
    let station = await stationController.getAllStationDetails();
    res.status(200).json(station);
}

station.deleteStation = async function (req, res) {
    let station = await stationController.deleteStation(req.body.station_id, req.body.user_id);
    res.status(200).json(station);
}

station.getStation = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    let station = await stationController.getStation(req.params.id);
    res.status(200).json(station);

};
station.getListSong = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    let playlist = await stationController.getListSong(req.params.id);
    res.status(200).json(playlist);

};
station.getAllAvailableStations = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    let station = await stationController.getAllAvailableStations();
    res.status(200).json(station);

};
station.setIsPrivateOfStation = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    let station = await stationController.setIsPrivateOfStation(req.params.id, req.body.user_id, req.body.value);
    res.status(200).json(station);

};

station.getListSongHistory = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    let station = await stationController.getListSongHistory(req.params.id, 3);
    res.status(200).json(station);

};
station.getAvailableListSong = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    let station = await stationController.getAvailableListSong(req.params.id);
    res.status(200).json(station);

};
station.addSong = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    let station = await stationController.addSong(req.params.id, req.body.url, req.body.user_id);
    res.status(200).json(station);

};

station.updateStartingTime = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    let station = await stationController.updateStartingTime(req.params.id, req.body.starting_time);
    res.status(200).json(station);

};
station.setPlayedSongs = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    let station = await stationController.setPlayedSongs(req.params.id, req.body.songIds);
    res.status(200).json(station);

};

station.upVote = async function (req, res) {
    let song = await stationController.upVote(req.params.id, req.body.song_id, req.body.user_id);
    res.json(song);
}
station.downVote = async function (req, res) {
    let song = await stationController.downVote(req.params.id, req.body.song_id, req.body.user_id);
    res.json(song);
}

station.getListStationUserAddedSong = async function (req, res) {
    let song = await stationController.getListStationUserAddedSong(req.body.user_id);
    res.json(song);
}

station.getStationsByUserId = async function (req, res) {
    let stations = await stationController.getStationsByUserId(req.body.user_id);
    res.json(stations);
}