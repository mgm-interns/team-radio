import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { ReactSubscriptionComponent } from 'Common';
import { Loading } from 'Components';
import { AllRealTimeStationsQuery, OnRealTimeStationsChangedSubscription } from 'RadioGraphql';
import * as React from 'react';
import { StationsHelper } from 'team-radio-shared';
import { StationItem } from '../StationItem';
import { styles } from './styles';

class CoreStationList extends ReactSubscriptionComponent<CoreStationList.Props> {
  public render() {
    const { itemComponent: StationComponent, onItemClick } = this.props;

    return this.renderWrapper(data =>
      StationsHelper.sortRealTimeStations(data).map(station => (
        <StationComponent key={station.id} station={station} onClick={onItemClick} />
      ))
    );
  }

  protected getSubscribeToMoreOptions = () => {
    return OnRealTimeStationsChangedSubscription.getSubscribeToMoreOptions();
  };

  private renderWrapper = (children: (data: AllRealTimeStationsQuery.Station[]) => React.ReactNode) => {
    const { data, classes } = this.props;

    if (data.error) {
      return <Typography color={'error'}>Error {data.error.message}</Typography>;
    }

    if (data.loading) {
      return (
        <div className={classes.progressContainer}>
          <Loading />
        </div>
      );
    }

    return children(data.allRealTimeStations);
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
