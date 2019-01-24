import * as React from 'react';

export interface IStationPlayerPositionState {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface IStationPlayerPosition extends IStationPlayerPositionState {
  setPosition: (options: IStationPlayerPositionState) => void;
  resetPosition: () => void;
}

export const StationPlayerPositionContext = React.createContext<IStationPlayerPosition>({
  top: 0,
  left: 0,
  width: 0,
  height: 0,

  setPosition: () => ({}),
  resetPosition: () => ({})
});
