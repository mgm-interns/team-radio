/* eslint-disable */
var stationController = require('../src/controllers/station');

// create a station
var station = {};
module.exports = station;

station.addStation = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    let station = await stationController.addStation(req.body.station_name, req.body.user_id);
    res.status(200).json(station);

};

station.getAllAvailableStations = async function (req, res) {
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
    console.log('resolve : ' + station)
    res.status(200).json(station);

};
station.getListSong = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    let playlist = await stationController.getListSong(req.params.id);
    console.log('resolve : ' + playlist)
    res.status(200).json(playlist);

};
station.getStations = async function (req, res) {
    console.log("getStations")
    //  var station = await stationController.addStation(req.body.station_name);
    let station = await stationController.getAllAvailableStations();
    console.log('resolve : ' + station)
    res.status(200).json(station);

};

station.addSong = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    console.log('res.body.user_i' );
    console.log('res.body.user_i : ' + req.body.user_id);
    let station = await stationController.addSong(req.params.id, req.body.url,req.body.user_id);
    console.log('resolve : ' + station);
    res.status(200).json(station);

};

station.updateStartingTime = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    console.log('starting_time : ' + req.body.starting_time);
    let station = await stationController.updateStartingTime(req.params.id, req.body.starting_time);
    console.log('starting_time : ' + JSON.stringify(station));
    res.status(200).json(station);

};
station.setPlayedSongs = async function (req, res) {
    //  var station = await stationController.addStation(req.body.station_name);
    console.log('setPlayedSongs : ' + req.body.songIds);
    let station = await stationController.setPlayedSongs(req.params.id, req.body.songIds);
    console.log('setPlayedSongs : ' + JSON.stringify(station));
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