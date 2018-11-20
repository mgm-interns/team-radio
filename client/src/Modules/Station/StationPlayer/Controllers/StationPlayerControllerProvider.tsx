import { Container } from 'Common';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SetStationPlayerControllerContainerFunction, StationPlayerController } from './Context';

class StationPlayerControllerProvider extends React.Component<CoreProps, CoreStates> {
  public state: CoreStates = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };

  private playerContainer: React.ReactInstance = null;

  public componentDidMount() {
    this.updateContainerPosition();
    window.addEventListener('resize', this.updateContainerPosition);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateContainerPosition);
  }

  public render() {
    const { children } = this.props;
    return (
      <StationPlayerController.Provider
        value={{
          ...this.state,
          container: this.playerContainer,
          setContainer: this.setStationPlayerControllerLocalState
        }}
      >
        {children}
      </StationPlayerController.Provider>
    );
  }

  private setStationPlayerControllerLocalState: SetStationPlayerControllerContainerFunction = ({ container }) => {
    this.playerContainer = container;
  };

  private updateContainerPosition = () => {
    const playerContainer = ReactDOM.findDOMNode(this.playerContainer) as Element;
    if (playerContainer) {
      const { top, left, width, height } = playerContainer.getBoundingClientRect();
      if (
        this.state.top !== top ||
        this.state.left !== left ||
        this.state.width !== width ||
        this.state.height !== height
      ) {
        this.setState({ top, left, width, height });
      }
    } else {
      // If the reference container not found, hide the player & retry until found the reference container
      this.playerContainer = null;
      this.setState({ top: 0, left: 0, width: 0, height: 0 });
      // FIXME: It is a cheat to recall function in the last position of execution stack
      setTimeout(this.updateContainerPosition);
    }
  };
}

interface CoreProps extends Props {}

interface CoreStates {
  top: number;
  left: number;
  width: number;
  height: number;
}

export default StationPlayerControllerProvider;

export interface Props extends Container {}
