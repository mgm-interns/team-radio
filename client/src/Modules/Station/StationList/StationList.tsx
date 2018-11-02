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
    const { StationItem, onItemClick } = this.props;

    return this.renderWrapper(data =>
      StationsHelper.sortRealTimeStations(data).map(station => (
        <StationItem key={station.id} station={station} onClick={onItemClick} />
      ))
    );
  }

  protected getSubscribeToMoreOptions = () => {
    return getSubscribeToMoreOptionsForRealTimeStationsSubscription();
  };

  private renderWrapper = (children: (data: AllRealTimeStationsQueryStation[]) => React.ReactNode) => {
    const { data, classes } = this.props;

    if (data.loading) {
      return <Loading />;
    }

    if (data.error) {
      return (
        <Typography className={classes.error} color={'error'}>
          Error {data.error.message}
        </Typography>
      );
    }

    return children(data.allRealTimeStations);
  };
}

interface CoreProps extends WithAllRealTimeStationsQueryProps, WithStyles<typeof styles>, Props {}

export default withAllRealTimeStationsQuery<Props>()(withStyles(styles)(StationList));

export interface Props {
  StationItem: React.ComponentType<StationItemProps>;
  onItemClick?(): void;
  subscribeToStationsChanged?(): void;
}
