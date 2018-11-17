import { IStationControllerLocalState, SetStationControllerStateFunction, StationController } from 'Modules';
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
    mute: false
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
    const { mute } = this.state;
    const { RealTimeStation, layout } = this.props;
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
        value={{ mute, onlineAnonymous, onlineCount, onlineUsers, setState: this.setContextState }}
      >
        {layout}
      </StationController.Provider>
    );
  }

  private setContextState: SetStationControllerStateFunction = ({ mute }, callback) => {
    this.setState({ mute }, callback);
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
  RealTimeStation: RealTimeStationQueryStation;
  layout: React.ReactNode;
  params: RealTimeStationQueryVariables;
  subscribeToMore: any;
}
