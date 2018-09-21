import { AnonymousUser } from '../types';
import { User } from 'entities';

export enum StationTopic {
  JOIN_STATION = 'JOIN_STATION',
  LEAVE_STATION = 'LEAVE_STATION',
  ADD_SONG = 'ADD_SONG'
}

export interface JoinStationPayLoad {
  stationId: string;
  user: User | AnonymousUser;
}

export interface LeaveStationPayLoad {
  stationId: string;
  user: User | AnonymousUser;
}
