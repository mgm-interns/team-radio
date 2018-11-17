import { RealTimeStationQueryOnlineAnonymous, RealTimeStationQueryOnlineUser } from 'RadioGraphql';
import * as React from 'react';

export interface IStationControllerLocalState {
  mute: boolean;
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
  mute: false,
  onlineUsers: [],
  onlineAnonymous: [],
  onlineCount: 0,

  setState: () => ({})
});
