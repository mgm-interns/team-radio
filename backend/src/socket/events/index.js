import createStation from './createStation';
import joinStation from './joinStation';
import leaveStation from './leaveStation';
import addSong from './addSong';
import addMultiSong from './addMultiSong';
import voteSong from './voteSong';
import socketDisconnect from './socketDisconnect';
import socketConnect from './socketConnect';
import addFavourite from './addFavouriteSong';
import getFavouriteSongs from './getFavouriteSongs';
import searchStation from './searchStation';
import redirectStation from './redirectStation';

export default {
  socketConnect,
  createStation,
  updateStationOwner,
  joinStation,
  leaveStation,
  addSong,
  addMultiSong,
  voteSong,
  socketDisconnect,
  getFavouriteSongs,
  addFavourite,
  searchStation,
  redirectStation,
};
