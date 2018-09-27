import { AnonymousUser } from '../types';
import { User, Song } from 'entities';

export namespace StationTopic {
  export const JOIN_STATION = 'JOIN_STATION';
  export interface JoinStationPayLoad extends StationIdPayload, BaseUserPayload {}

  export const LEAVE_STATION = 'LEAVE_STATION';
  export interface LeaveStationPayLoad extends StationIdPayload, BaseUserPayload {}

  export const START_PLAYER = 'START_PLAYER';
  export interface StartPlayerPayLoad extends StationIdPayload {}

  export const PAUSE_PLAYER = 'PAUSE_PLAYER';
  export interface PausePlayerPayLoad extends StationIdPayload {}

  export const STOP_PLAYER = 'STOP_PLAYER';
  export interface StopPlayerPayLoad extends StationIdPayload {}

  export const UPDATE_PLAYER_SONG = 'UPDATE_PLAYER_SONG';
  export interface UpdatePlayerSongPayLoad extends StationIdPayload {
    song: Song | null;
  }

  export const ADD_PLAYLIST_SONG = 'ADD_PLAYLIST_SONG';
  export interface AddPlaylistSongPayLoad extends StationIdPayload, BaseUserPayload, SongPayload {}

  export const REMOVE_PLAYLIST_SONG = 'REMOVE_PLAYLIST_SONG';
  export interface RemovePlaylistSongPayLoad extends StationIdPayload, SongIdPayload {}

  export const ADD_SONG_TO_HISTORY = 'ADD_SONG_TO_HISTORY';
  export interface AddSongToHistory extends StationIdPayload, SongPayload {}

  export interface StationIdPayload {
    stationId: string;
  }

  export interface SongIdPayload {
    songId: string;
  }

  export interface SongPayload {
    song: Song;
  }

  export interface BaseUserPayload {
    user: User | AnonymousUser;
  }
}
