import { withStyles, WithStyles } from '@material-ui/core';
import { Loading } from 'Components';
import { DefaultStationLayoutProps, StationLayout } from 'Containers';
import {
  StationChatBox,
  StationItem,
  StationList,
  StationPlayer,
  StationSongs,
  StationSongSearch,
  StationToolbar
} from 'Modules';
import {
  RealTimeStationQuery,
  RealTimeStationQueryVariables,
  withJoinStationMutation,
  WithJoinStationMutationProps
} from 'RadioGraphql';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import PageLogic from './PageLogic';
import { styles } from './styles';

class StationPage extends React.Component<CoreProps, CoreStates> {
  public state: CoreStates = {
    drawer: false
  };

  public render(): React.ReactNode {
    const Layout = this.getLayout();
    return (
      <RealTimeStationQuery
        variables={this.props.match.params}
        onCompleted={() => this.props.mutate({ variables: this.props.match.params })}
      >
        {({ data, loading, error, subscribeToMore }) => {
          let stationName = <Loading color={'inherit'} />;
          if (!loading && !error) {
            stationName = <span>{data.RealTimeStation.stationName}</span>;
          }
          return (
            <PageLogic
              RealTimeStation={data.RealTimeStation}
              layout={<Layout {...this.getLayoutProps(stationName)} />}
              params={this.props.match.params}
              subscribeToMore={subscribeToMore}
            />
          );
        }}
      </RealTimeStationQuery>
    );
  }

  private getLayout = (): React.ComponentType<DefaultStationLayoutProps> => {
    // TODO: any other layouts?
    switch (true) {
      default:
        return StationLayout.DefaultLayout;
    }
  };

  private getLayoutProps = (title?: React.ReactNode): DefaultStationLayoutProps => {
    const { params } = this.props.match;
    return {
      title,
      stationPlayer: <StationPlayer params={params} />,
      stationChatBox: <StationChatBox />,
      stationSongs: <StationSongs params={params} />,
      stationSongSearch: <StationSongSearch />,
      toolbar: <StationToolbar />,
      stations: (
        <StationList StationItem={StationItem.VerticalStation} onItemClick={() => this.setState({ drawer: false })} />
      ),
      drawer: {
        open: this.state.drawer,
        onClose: () => this.setState({ drawer: false }),
        onOpen: () => this.setState({ drawer: true }),
        toggle: () => this.setState(state => ({ drawer: !state.drawer }))
      }
    };
  };
}

interface CoreProps
  extends WithJoinStationMutationProps,
    RouteComponentProps<RealTimeStationQueryVariables>,
    WithStyles<typeof styles>,
    Props {}

interface CoreStates {
  drawer: boolean;
}

export default withJoinStationMutation<Props>()(withStyles(styles)(withRouter(StationPage)));

export interface Props {}
