import { AnonymousUser } from '../types';
import { User } from 'entities';

export enum StationTopic {
  JOIN_STATION = 'JOIN_STATION',
  LEAVE_STATION = 'LEAVE_STATION'
}

export interface JoinStationPayLoad {
  stationId: string;
  user: User | AnonymousUser;
}

export interface LeaveStationPayLoad {
  stationId: string;
  user: User | AnonymousUser;
}
