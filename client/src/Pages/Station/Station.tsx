import { withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { StationChatBox, StationList, StationPlayer, StationSongs, StationSongSearch, StationToolbar } from 'Modules';
import { StationItem } from 'Modules/Station/StationItem';
import { AllRealTimeStations, OnRealTimeStationsChanged } from 'RadioGraphql';
import * as React from 'react';
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
    const title = 'My Station';
    return <Layout {...this.getLayoutProps(title)} />;
  }

  private getAllStations = (): React.ReactElement<{}> => {
    return (
      <AllRealTimeStations.Query query={AllRealTimeStations.QUERY}>
        {({ subscribeToMore, ...others }) => (
          <StationList
            {...others}
            subscribeToStationsChanged={() => subscribeToMore(OnRealTimeStationsChanged.getSubscribeToMoreOptions())}
            stationComponent={StationItem.VerticalStation}
            onItemClick={() => this.setState({ drawer: false })}
          />
        )}
      </AllRealTimeStations.Query>
    );
  };

  private getLayout = (): React.ComponentType<DefaultLayout.Props> => {
    // TODO: any other layouts?
    switch (true) {
      default:
        return DefaultLayout;
    }
  };

  private getLayoutProps = (title?: string): DefaultLayout.Props => {
    return {
      title,
      stationPlayer: <StationPlayer />,
      stationChatBox: <StationChatBox />,
      stationSongs: <StationSongs />,
      stationSongSearch: <StationSongSearch />,
      toolbar: <StationToolbar />,
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
