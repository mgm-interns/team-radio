import { RealTimeStationQueryOnlineAnonymous, RealTimeStationQueryOnlineUser } from 'RadioGraphql';
import * as React from 'react';

export interface IStationControllerLocalState {
  muted: boolean;
}

export interface IStationControllerNetworkState {
  onlineUsers: RealTimeStationQueryOnlineUser[];
  onlineAnonymous: RealTimeStationQueryOnlineAnonymous[];
  onlineCount: number;
}

export type SetStationControllerStateFunction = (
  options: Partial<IStationControllerLocalState>,
  callback?: () => void
) => void;

export interface IStationController extends IStationControllerLocalState, IStationControllerNetworkState {
  setState: SetStationControllerStateFunction;
}

export const StationController = React.createContext<IStationController>({
  muted: false,
  onlineUsers: [],
  onlineAnonymous: [],
  onlineCount: 0,

  setState: () => ({})
});
