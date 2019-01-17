import { Typography } from '@material-ui/core';
import { Loading } from 'Components';
import { useSubscription } from 'Hooks';
import {
  AllRealTimeStationsQueryStation,
  getSubscribeToMoreOptionsForRealTimeStationsSubscription,
  withAllRealTimeStationsQuery,
  WithAllRealTimeStationsQueryProps
} from 'RadioGraphql';
import * as React from 'react';
import { StationsHelper } from 'team-radio-shared';
import { StationItemProps } from '../StationItem';
import { useStyles } from './styles';

const StationList: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const subscribeToMoreOptions = React.useMemo(getSubscribeToMoreOptionsForRealTimeStationsSubscription, []);

  useSubscription(props.data, subscribeToMoreOptions);

  const renderWrapper = React.useCallback(
    (children: (data: AllRealTimeStationsQueryStation[]) => React.ReactElement<{}>) => {
      const { data } = props;

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

      return children(data.items);
    },
    [classes, props.data]
  );

  const { StationItem, onItemClick } = props;

  return renderWrapper(data => (
    <>
      {StationsHelper.sortRealTimeStations(data).map(station => (
        <StationItem key={station.id} station={station} onClick={onItemClick} />
      ))}
    </>
  ));
};

interface CoreProps extends WithAllRealTimeStationsQueryProps, Props {}

export default withAllRealTimeStationsQuery<Props>({
  options: { notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' }
})(StationList);

export interface Props {
  StationItem: React.ComponentType<StationItemProps>;
  onItemClick?(): void;
  subscribeToStationsChanged?(): void;
}
