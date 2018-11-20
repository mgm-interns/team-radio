import * as React from 'react';

export interface IStationPlayerControllerLocalState {
  container?: React.ReactInstance;
  top: number;
  left: number;
  width: number;
  height: number;
}

export type SetStationPlayerControllerContainerFunction = (
  options: Partial<IStationPlayerControllerLocalState>
) => void;

export interface IStationPlayerController extends IStationPlayerControllerLocalState {
  setContainer: SetStationPlayerControllerContainerFunction;
}

export const StationPlayerController = React.createContext<IStationPlayerController>({
  container: null,
  top: 0,
  left: 0,
  width: 0,
  height: 0,

  setContainer: () => ({})
});
