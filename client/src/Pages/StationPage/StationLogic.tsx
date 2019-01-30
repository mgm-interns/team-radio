import { useMutedLocalStorage, useSubscription } from '@Hooks';
import {
  StationControllerContext,
  StationPlayer,
  StationPlayerControllerProvider,
  StationPlayerPositionContext
} from '@Modules';
import { StationPageParams } from '@Pages/StationPage/StationPage';
import { RealTimeStationQuery, RealTimeStationSubscription } from '@RadioGraphql';
import { SubscribeToMoreOptions } from 'apollo-boost';
import * as React from 'react';
import { useStyles } from './styles';

const StationLogic: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const { station, layout, params } = props;

  const onlineAnonymous = React.useMemo<RealTimeStationQuery.OnlineAnonymous[]>(
    () => (station ? station.onlineAnonymous : []),
    [station]
  );
  const onlineUsers = React.useMemo<RealTimeStationQuery.OnlineUser[]>(() => (station ? station.onlineUsers : []), [
    station
  ]);
  const onlineCount = React.useMemo<number>(() => (station ? station.onlineCount : 0), [station]);

  const [muted, setMuted] = useMutedLocalStorage<boolean>(false);

  const variables = React.useMemo<RealTimeStationQuery.Variables>(() => ({ stationId: props.params.stationId }), [
    props.params.stationId
  ]);

  const subscribeToMoreOptions = React.useMemo(() => RealTimeStationSubscription.getSubscribeToMoreOptions(variables), [
    variables
  ]);

  useSubscription(props.subscribeToMore, subscribeToMoreOptions);

  return (
    <StationControllerContext.Provider value={{ muted, onlineAnonymous, onlineCount, onlineUsers, setMuted }}>
      <StationPlayerControllerProvider>
        {layout}
        <StationPlayerPositionContext.Consumer>
          {({ top, left, width, height }) => (
            <div style={{ top, left, width, height }} className={classes.playerContainer}>
              <StationPlayer params={params} />
            </div>
          )}
        </StationPlayerPositionContext.Consumer>
      </StationPlayerControllerProvider>
    </StationControllerContext.Provider>
  );
};

interface CoreProps extends Props {}

export default StationLogic;

export interface Props {
  station?: RealTimeStationQuery.Station;
  layout: React.ReactNode;
  params: StationPageParams;
  subscribeToMore: (options: SubscribeToMoreOptions<any, any, any>) => () => void;
}
