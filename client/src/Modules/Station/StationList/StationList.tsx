import { CircularProgress, Typography, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable } from 'Common';
import { AllRealTimeStationsQuery, OnRealTimeStationsChangedSubscription } from 'RadioGraphql';
import * as React from 'react';
import { StationsHelper } from 'team-radio-shared';
import { StationItem } from '../StationItem';
import { styles } from './styles';

class CoreStationList extends React.Component<CoreStationList.Props> {
  private isSubscribed: boolean;
  private unSubscribe: () => void;

  /**
   * Subscribe to update the station player status
   * Also cancel the subscription when change station
   */
  public componentDidUpdate() {
    if (this.props.data.allRealTimeStations && !this.isSubscribed) {
      this.isSubscribed = true;
      const options = OnRealTimeStationsChangedSubscription.getSubscribeToMoreOptions();
      this.unSubscribe = this.props.data.subscribeToMore(options);
    }
  }

  /**
   * Cancel subscription when destroy component
   */
  public componentWillUnmount() {
    if (this.isSubscribed) {
      this.callUnsubscribe();
    }
  }

  public render() {
    const { itemComponent: StationComponent, onItemClick } = this.props;

    return this.renderWrapper(data =>
      StationsHelper.sortRealTimeStations(data).map(station => (
        <StationComponent key={station.id} station={station} onClick={onItemClick} />
      ))
    );
  }

  private renderWrapper = (children: (data: AllRealTimeStationsQuery.Station[]) => React.ReactNode) => {
    const { data, classes } = this.props;

    if (data.error) {
      return <Typography color={'error'}>Error {data.error.message}</Typography>;
    }

    if (data.loading) {
      return (
        <div className={classes.progressContainer}>
          <CircularProgress />
        </div>
      );
    }

    return children(data.allRealTimeStations);
  };

  private callUnsubscribe = () => {
    if (typeof this.unSubscribe === 'function') {
      this.unSubscribe();
      this.isSubscribed = false;
    }
  };
}

export namespace CoreStationList {
  export interface Props extends AllRealTimeStationsQuery.WithHOCProps, WithStyles<typeof styles>, StationList.Props {}
}

export const StationList = AllRealTimeStationsQuery.withHOC<StationList.Props>()(withStyles(styles)(CoreStationList));

export namespace StationList {
  export interface Props {
    itemComponent: React.ComponentType<StationItem.Props>;
    onItemClick?(): void;
    subscribeToStationsChanged?(): void;
  }
}
