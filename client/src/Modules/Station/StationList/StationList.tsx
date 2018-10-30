import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { ReactSubscriptionComponent } from 'Common';
import { Loading } from 'Components';
import {
  AllRealTimeStationsQueryStation,
  getSubscribeToMoreOptionsForRealTimeStationsSubscription,
  withAllRealTimeStationsQuery,
  WithAllRealTimeStationsQueryProps
} from 'RadioGraphql';
import * as React from 'react';
import { StationsHelper } from 'team-radio-shared';
import { StationItemProps } from '../StationItem';
import { styles } from './styles';

class StationList extends ReactSubscriptionComponent<CoreProps> {
  public render() {
    const { itemComponent: StationComponent, onItemClick } = this.props;

    return this.renderWrapper(data =>
      StationsHelper.sortRealTimeStations(data).map(station => (
        <StationComponent key={station.id} station={station} onClick={onItemClick} />
      ))
    );
  }

  protected getSubscribeToMoreOptions = () => {
    return getSubscribeToMoreOptionsForRealTimeStationsSubscription();
  };

  private renderWrapper = (children: (data: AllRealTimeStationsQueryStation[]) => React.ReactNode) => {
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

interface CoreProps extends WithAllRealTimeStationsQueryProps, WithStyles<typeof styles>, Props {}

export default withAllRealTimeStationsQuery<Props>()(withStyles(styles)(StationList));

export interface Props {
  itemComponent: React.ComponentType<StationItemProps>;
  onItemClick?(): void;
  subscribeToStationsChanged?(): void;
}
