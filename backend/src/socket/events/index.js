import createStation from './createStation';
import joinStation from './joinStation';
import leaveStation from './leaveStation';
import addSong from './addSong';
import addMultiSong from './addMultiSong';
import voteSong from './voteSong';
import checkExistUser from './checkExistUser';
import skipSong from './skipSong';
import socketDisconnect from './socketDisconnect';
import socketConnect from './socketConnect';

export default {
  socketConnect,
  createStation,
  joinStation,
  leaveStation,
  addSong,
  addMultiSong,
  voteSong,
  skipSong,
  checkExistUser,
  socketDisconnect,
};
