import { Loading } from '@Components';
import { DefaultStationLayoutProps, StationLayout } from '@Containers';
import { StationChatBox, StationItem, StationList, StationSongs, StationSongSearch, StationToolbar } from '@Modules';
import { JoinStationMutation, LeaveStationMutation, RealTimeStationQuery } from '@RadioGraphql';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import PageLogic from './StationLogic';

const StationPage: React.FunctionComponent<CoreProps> = props => {
  const [drawerState, setDrawerState] = React.useState<boolean>(false);
  const Layout = React.useMemo(() => {
    // TODO: any other layouts?
    switch (true) {
      default:
        return StationLayout.DefaultLayout;
    }
  }, []);

  const getLayoutProps = React.useCallback<(title: React.ReactNode) => DefaultStationLayoutProps>(
    title => {
      return {
        title,
        stationChatBox: <StationChatBox />,
        stationSongs: <StationSongs params={props.match.params} />,
        stationSongSearch: <StationSongSearch />,
        toolbar: <StationToolbar />,
        stations: <StationList StationItem={StationItem.VerticalStation} onItemClick={() => setDrawerState(false)} />,
        drawer: {
          open: drawerState,
          onClose: () => setDrawerState(false),
          onOpen: () => setDrawerState(true),
          toggle: () => setDrawerState(!drawerState)
        }
      };
    },
    [props.match]
  );

  const joinStation = JoinStationMutation.useMutation();
  const leaveStation = LeaveStationMutation.useMutation({ variables: props.match.params });

  React.useEffect(() => {
    return leaveStation;
  }, [leaveStation, props.match]);

  return (
    <RealTimeStationQuery.default
      variables={props.match.params}
      notifyOnNetworkStatusChange
      onCompleted={() => joinStation({ variables: props.match.params })}
    >
      {({ data, loading, error, subscribeToMore }) => {
        let stationName = <Loading color={'inherit'} />;
        if (!loading && !error) {
          stationName = <span>{data && data.item.stationName}</span>;
        }
        return (
          <PageLogic
            station={data && data.item}
            layout={<Layout {...getLayoutProps(stationName)} />}
            params={props.match.params}
            subscribeToMore={subscribeToMore}
          />
        );
      }}
    </RealTimeStationQuery.default>
  );
};

interface CoreProps extends RouteComponentProps<RealTimeStationQuery.Variables>, Props {}

export default withRouter(StationPage);

export interface Props {}
