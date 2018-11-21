import {
  IStationControllerLocalState,
  SetStationControllerStateFunction,
  StationController,
  StationControllerLocaleStorageHelper,
  StationPlayer,
  StationPlayerController,
  StationPlayerControllerProvider
} from 'Modules';
import {
  getSubscribeToMoreOptionsRealTimeStationSubscription,
  RealTimeStationQueryOnlineAnonymous,
  RealTimeStationQueryOnlineUser,
  RealTimeStationQueryStation,
  RealTimeStationQueryVariables
} from 'RadioGraphql';
import * as React from 'react';

export class PageLogic extends React.Component<CoreProps, CoreStates> {
  public state: CoreStates = {
    muted: StationControllerLocaleStorageHelper.getMuted()
  };
  private isSubscribed: boolean;
  private unSubscribe: () => void;

  public componentDidMount() {
    const options = this.getSubscribeToMoreOptions();
    this.unSubscribe = this.props.subscribeToMore(options);
    this.isSubscribed = true;
  }

  public componentDidUpdate(prevProps: CoreProps) {
    if (prevProps.params.stationId !== this.props.params.stationId) {
      if (this.isSubscribed) {
        this.callUnsubscribe();
      }
      this.isSubscribed = false;
      const options = this.getSubscribeToMoreOptions();
      this.unSubscribe = this.props.subscribeToMore(options);
      this.isSubscribed = true;
    }
  }

  public componentWillUnmount() {
    if (this.isSubscribed) {
      this.callUnsubscribe();
    }
  }

  public render() {
    const { muted } = this.state;
    const { RealTimeStation, layout, params } = this.props;
    let onlineAnonymous: RealTimeStationQueryOnlineAnonymous[] = [];
    let onlineUsers: RealTimeStationQueryOnlineUser[] = [];
    let onlineCount = 0;
    if (RealTimeStation) {
      onlineAnonymous = RealTimeStation.onlineAnonymous;
      onlineUsers = RealTimeStation.onlineUsers;
      onlineCount = RealTimeStation.onlineCount;
    }
    return (
      <StationController.Provider
        value={{ muted, onlineAnonymous, onlineCount, onlineUsers, setState: this.setStationControllerLocalState }}
      >
        <StationPlayerControllerProvider>
          {layout}
          <StationPlayerController.Consumer>
            {({ top, left, width, height }) => (
              <div style={{ top, left, width, height, position: 'fixed' }}>
                <StationPlayer params={params} />
              </div>
            )}
          </StationPlayerController.Consumer>
        </StationPlayerControllerProvider>
      </StationController.Provider>
    );
  }

  private setStationControllerLocalState: SetStationControllerStateFunction = ({ muted }, callback) => {
    this.setState({ muted }, () => {
      StationControllerLocaleStorageHelper.setMuted(this.state.muted);
      if (callback) callback();
    });
  };

  private callUnsubscribe = () => {
    if (typeof this.unSubscribe === 'function') {
      this.unSubscribe();
    }
  };

  private getSubscribeToMoreOptions = () => {
    return getSubscribeToMoreOptionsRealTimeStationSubscription(this.props.params);
  };
}

interface CoreProps extends Props {}

interface CoreStates extends IStationControllerLocalState {}

export default PageLogic;

export interface Props {
  RealTimeStation?: RealTimeStationQueryStation;
  layout: React.ReactNode;
  params: RealTimeStationQueryVariables;
  subscribeToMore: any;
}
