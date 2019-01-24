import * as React from 'react';
import { IStationPlayerPositionState, StationPlayerPositionContext } from './Context';

const initialState: Readonly<IStationPlayerPositionState> = { top: 0, left: 0, width: 0, height: 0 };

const StationPlayerPositionProvider: React.FunctionComponent<CoreProps> = props => {
  const [state, setState] = React.useState<IStationPlayerPositionState>(initialState);
  return (
    <StationPlayerPositionContext.Provider
      value={{
        ...state,
        setPosition: setState,
        resetPosition: () => setState(initialState)
      }}
    >
      {props.children}
    </StationPlayerPositionContext.Provider>
  );
};

interface CoreProps extends Props {}

export default StationPlayerPositionProvider;

export interface Props {}
