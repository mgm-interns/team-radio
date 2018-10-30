import { withStyles, WithStyles } from '@material-ui/core';
import { Loading } from 'Components';
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
import { DefaultLayout, DefaultLayoutProps } from './Layout';
import { styles } from './styles';

class StationPage extends React.Component<CoreProps, CoreStates> {
  constructor(props: CoreProps) {
    super(props);

    this.state = {
      drawer: false
    };
  }

  public render(): React.ReactNode {
    const Layout = this.getLayout();
    return (
      <RealTimeStationQuery
        variables={this.props.match.params}
        notifyOnNetworkStatusChange
        onCompleted={() => this.props.mutate({ variables: this.props.match.params })}
      >
        {({ data, loading, error }) => {
          let stationName = <Loading color={'inherit'} />;
          if (!loading && !error) {
            stationName = <span>{data.RealTimeStation.stationName}</span>;
          }
          return <Layout {...this.getLayoutProps(stationName)} />;
        }}
      </RealTimeStationQuery>
    );
  }

  private getLayout = (): React.ComponentType<DefaultLayoutProps> => {
    // TODO: any other layouts?
    switch (true) {
      default:
        return DefaultLayout;
    }
  };

  private getLayoutProps = (title?: React.ReactNode): DefaultLayoutProps => {
    const { params } = this.props.match;
    return {
      title,
      stationPlayer: <StationPlayer params={params} />,
      stationChatBox: <StationChatBox />,
      stationSongs: <StationSongs params={params} />,
      stationSongSearch: <StationSongSearch />,
      toolbar: <StationToolbar />,
      stations: (
        <StationList itemComponent={StationItem.VerticalStation} onItemClick={() => this.setState({ drawer: false })} />
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
