import { Loading } from '@Components';
import { DefaultStationLayoutProps, StationLayout } from '@Containers';
import { useToggle } from '@Hooks';
import {
  StationChatBox,
  StationItem,
  StationList,
  StationSongs,
  StationSongSearch,
  StationTab,
  StationToolbar
} from '@Modules';
import { JoinStationMutation, LeaveStationMutation, RealTimeStationQuery } from '@RadioGraphql';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import PageLogic from './StationLogic';

const StationPage: React.FunctionComponent<CoreProps> = props => {
  const [drawerState, drawerAction] = useToggle(false);
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
        stations: <StationList StationItem={StationItem.VerticalStation} onItemClick={drawerAction.toggleOff} />,
        drawer: {
          open: drawerState,
          onClose: () => drawerAction.toggleOn(),
          onOpen: () => drawerAction.toggleOff(),
          toggle: () => drawerAction.toggle()
        }
      };
    },
    [props.match]
  );

  const variables = React.useMemo<RealTimeStationQuery.Variables>(() => {
    return { stationId: props.match.params.stationId };
  }, [props.match.params.stationId]);
  const joinStation = JoinStationMutation.useMutation({ variables });
  const leaveStation = LeaveStationMutation.useMutation({ variables });

  React.useEffect(() => {
    joinStation();
    return leaveStation;
  }, [props.match.params.stationId]);

  return (
    <RealTimeStationQuery.default variables={variables} notifyOnNetworkStatusChange>
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

interface CoreProps extends RouteComponentProps<StationPageParams>, Props {}

export default withRouter(StationPage);

export interface StationPageParams {
  stationId: string;
  tab?: StationTab;
}
export interface Props {}
