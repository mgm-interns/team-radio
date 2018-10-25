import { withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { VerticalStation } from 'Components';
import { StationChatBox, StationPlayer, StationSongs, StationSongSearch } from 'Modules';
import { AllStations } from 'RadioGraphql';
import * as React from 'react';
import { Query } from 'react-apollo';
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
    return <Layout {...this.getLayoutProps()} />;
  }

  private getAllStations = (): React.ReactElement<{}> => {
    return (
      <Query query={AllStations.getAllStationsQuery}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error: ${error.message}`;

          return data.allStations.map((station: AllStations.Station) => (
            <VerticalStation
              key={station.stationId}
              station={station}
              onClick={() => this.setState({ drawer: false })}
            />
          ));
        }}
      </Query>
    );
  };

  private getLayout = (): React.ComponentType<DefaultLayout.Props> => {
    // TODO: any other layouts?
    switch (true) {
      default:
        return DefaultLayout;
    }
  };

  private getLayoutProps = (): DefaultLayout.Props => {
    return {
      stationPlayer: <StationPlayer />,
      stationChatBox: <StationChatBox />,
      stationSongs: <StationSongs />,
      stationSongSearch: <StationSongSearch />,
      stations: this.getAllStations(),
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
  export interface Props extends Station.Props, WithStyles<typeof styles> {}
  export interface States {
    drawer: boolean;
  }
}

export const Station: React.ComponentType<Station.Props> = withStyles(styles)(CoreStation);

export namespace Station {
  export interface Props extends Identifiable, Styleable {}
}
