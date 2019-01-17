import { useWindowResizeEffect } from 'Hooks';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SetStationPlayerControllerContainerFunction, StationPlayerController } from './Context';

const initialState: CoreStates = { top: 0, left: 0, width: 0, height: 0 };

const StationPlayerControllerProvider: React.FunctionComponent<CoreProps> = props => {
  const [state, setState] = React.useState<CoreStates>(initialState);
  const playerContainerRef = React.useRef<React.ReactInstance>(null);

  const setStationPlayerControllerLocalState = React.useCallback<SetStationPlayerControllerContainerFunction>(
    ({ container }) => {
      playerContainerRef.current = container;
    },
    [playerContainerRef]
  );

  const updateContainerPosition = React.useCallback(
    () => {
      const playerContainer = ReactDOM.findDOMNode(playerContainerRef.current) as Element | null;
      if (playerContainer) {
        const { top, left, width, height } = playerContainer.getBoundingClientRect();
        if (state.top !== top || state.left !== left || state.width !== width || state.height !== height) {
          setState({ top, left, width, height });
        }
      } else {
        // If the reference container not found, hide the player & retry until found the reference container
        playerContainerRef.current = null;
        setState(initialState);
      }
    },
    [playerContainerRef]
  );
  // Execute callback when window resize event trigger
  useWindowResizeEffect(updateContainerPosition, [playerContainerRef]);
  // Execute callback after render to set initial value
  React.useLayoutEffect(updateContainerPosition, [playerContainerRef]);

  return (
    <StationPlayerController.Provider
      value={{
        ...state,
        container: playerContainerRef.current,
        setContainer: setStationPlayerControllerLocalState
      }}
    >
      {props.children}
    </StationPlayerController.Provider>
  );
};

interface CoreProps extends Props {}

interface CoreStates {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default StationPlayerControllerProvider;

export interface Props {}
