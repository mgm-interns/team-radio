import { withStyles, WithStyles } from '@material-ui/core';
import { Loading } from 'Components';
import { StationChatBox, StationList, StationPlayer, StationSongs, StationSongSearch, StationToolbar } from 'Modules';
import { StationItem } from 'Modules/Station/StationItem';
import { JoinStationMutation, RealTimeStationQuery } from 'RadioGraphql';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { DefaultLayout } from './Layout';
import { styles } from './styles';

class CoreStation extends React.Component<CoreStation.Props, CoreStation.States> {
  constructor(props: CoreStation.Props) {
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

  private getLayout = (): React.ComponentType<DefaultLayout.Props> => {
    // TODO: any other layouts?
    switch (true) {
      default:
        return DefaultLayout;
    }
  };

  private getLayoutProps = (title?: React.ReactNode): DefaultLayout.Props => {
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

namespace CoreStation {
  export interface Props
    extends Station.Props,
      JoinStationMutation.WithHOCProps,
      RouteComponentProps<RealTimeStationQuery.Variables>,
      WithStyles<typeof styles> {}
  export interface States {
    drawer: boolean;
  }
}

export const Station: React.ComponentType<Station.Props> = JoinStationMutation.withHOC<Station.Props>({})(
  withStyles(styles)(withRouter(CoreStation))
);

export namespace Station {
  export interface Props {}
}
