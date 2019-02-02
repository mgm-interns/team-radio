import { Loading } from '@Components';
import { DefaultStationLayoutProps, StationLayout } from '@Containers';
import { useMutedLocalStorage, useToggle } from '@Hooks';
import {
  StationChatBox,
  StationControllerContext,
  StationItem,
  StationList,
  StationPlayer,
  StationPlayerControllerProvider,
  StationPlayerPositionContext,
  StationSongs,
  StationSongSearch,
  StationTab,
  StationToolbar
} from '@Modules';
import { useStyles } from '@Pages/StationPage/styles';
import {
  JoinStationMutation,
  LeaveStationMutation,
  RealTimeStationQuery,
  RealTimeStationSubscription
} from '@RadioGraphql';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

const StationPage: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const [drawerState, drawerAction] = useToggle(false);

  const Layout = React.useMemo(() => {
    // TODO: any other layouts?
    switch (true) {
      default:
        return StationLayout.DefaultLayout;
    }
  }, []);
  const getLayoutProps = React.useCallback<(title: React.ReactNode) => DefaultStationLayoutProps>(title => {
    return {
      title,
      stationChatBox: <StationChatBox />,
      stationSongs: <StationSongs />,
      stationSongSearch: <StationSongSearch />,
      toolbar: <StationToolbar />,
      stations: <StationList StationItem={StationItem.VerticalStation} onItemClick={drawerAction.toggleOff} />,
      drawer: {
        open: drawerState,
        onClose: () => drawerAction.toggleOn(),
        onOpen: () => drawerAction.toggleOff(),
        toggle: () => drawerAction.toggle()
      }
    };
  }, []);

  const variables = React.useMemo<RealTimeStationQuery.Variables>(() => {
    return { stationId: props.match.params.stationId };
  }, [props.match.params.stationId]);

  const { data, loading, error } = RealTimeStationSubscription.useQueryWithSubscription({ variables, suspend: false });
  const joinStation = JoinStationMutation.useMutation({ variables });
  const leaveStation = LeaveStationMutation.useMutation({ variables });

  React.useEffect(() => {
    if (!data) return;
    joinStation();
    return leaveStation;
  }, [props.match.params.stationId]);

  const stationName = React.useMemo(() => {
    if (!loading && !error) {
      return <span>{data && data.item.stationName}</span>;
    }
    return <Loading color={'inherit'} />;
  }, [data, loading, error]);

  const onlineAnonymous = React.useMemo<RealTimeStationQuery.OnlineAnonymous[]>(
    () => (data && data.item ? data.item.onlineAnonymous : []),
    [data]
  );
  const onlineUsers = React.useMemo<RealTimeStationQuery.OnlineUser[]>(
    () => (data && data.item ? data.item.onlineUsers : []),
    [data]
  );
  const onlineCount = React.useMemo<number>(() => (data && data.item ? data.item.onlineCount : 0), [data]);

  const [muted, setMuted] = useMutedLocalStorage<boolean>(false);

  return (
    <StationControllerContext.Provider value={{ muted, onlineAnonymous, onlineCount, onlineUsers, setMuted }}>
      <StationPlayerControllerProvider>
        <Layout {...getLayoutProps(stationName)} />
        <StationPlayerPositionContext.Consumer>
          {({ top, left, width, height }) => (
            <div style={{ top, left, width, height }} className={classes.playerContainer}>
              <StationPlayer params={props.match.params} />
            </div>
          )}
        </StationPlayerPositionContext.Consumer>
      </StationPlayerControllerProvider>
    </StationControllerContext.Provider>
  );
};

interface CoreProps extends RouteComponentProps<PageParams>, Props {}

export default withRouter(StationPage);

export interface PageParams {
  stationId: string;
  tab?: StationTab;
}
export interface Props {}
