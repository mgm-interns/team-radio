import { Loading } from '@Components';
import { useSubscription } from '@Hooks';
import { Typography } from '@material-ui/core';
import { AllRealTimeStationsQuery, RealTimeStationsSubscription } from '@RadioGraphql';
import * as React from 'react';
import { StationsHelper } from 'team-radio-shared';
import { StationItemProps } from '../StationItem';
import { useStyles } from './styles';

const StationList: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const subscribeToMoreOptions = React.useMemo(RealTimeStationsSubscription.getSubscribeToMoreOptions, []);

  useSubscription(props.data, subscribeToMoreOptions);

  const renderWrapper = React.useCallback(
    (children: (data: AllRealTimeStationsQuery.Station[]) => React.ReactElement<{}>) => {
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

      if (!data.items) return null;

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

interface CoreProps extends AllRealTimeStationsQuery.WithHOCProps, Props {}

export default AllRealTimeStationsQuery.withHOC<Props>({
  options: { notifyOnNetworkStatusChange: true }
})(StationList as any);

export interface Props {
  StationItem: React.ComponentType<StationItemProps>;
  onItemClick?(): void;
  subscribeToStationsChanged?(): void;
}
