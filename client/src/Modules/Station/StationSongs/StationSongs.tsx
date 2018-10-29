import { Card, Tab, Tabs, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable } from 'Common';
import { Playlist } from 'Modules';
import { RealTimeStationPlayerQuery } from 'RadioGraphql';
import * as React from 'react';
import { styles } from './styles';

class CoreStationSongs extends React.Component<CoreStationSongs.Props, CoreStationSongs.States> {
  constructor(props: CoreStationSongs.Props) {
    super(props);

    this.state = {
      tabValue: 0
    };
  }

  public render() {
    const { tabValue } = this.state;
    const { classes, params, id } = this.props;

    return (
      <Card id={id} className={classes.container}>
        <Tabs
          value={tabValue}
          onChange={this.handleTabChange}
          indicatorColor={'primary'}
          textColor={'primary'}
          scrollable
          scrollButtons={'auto'}
        >
          <Tab label={'Playlist'} />
          <Tab label={'History'} />
          <Tab label={'Favorite'} />
        </Tabs>
        {tabValue === 0 && <Playlist params={params} />}
        {tabValue === 1 && this.generateTabContainer('History')}
        {tabValue === 2 && this.generateTabContainer('Favorite')}
      </Card>
    );
  }

  // TODO: fetch data for each tab
  private generateTabContainer = (tab: React.ReactNode): React.ReactElement<{}> => {
    const { classes } = this.props;
    const children = Array.from({ length: 20 });
    return (
      <div className={classes.tabContainer}>
        {children.map((item, index) => (
          <div key={index} style={{ height: 80, marginTop: 4, marginBottom: 4, background: 'orchid' }} />
        ))}
      </div>
    );
  };

  private handleTabChange = (event: React.ChangeEvent<{}>, value: number): void => {
    event.preventDefault();
    this.setState({
      tabValue: value
    });
  };
}

namespace CoreStationSongs {
  export interface Props extends StationSongs.Props, WithStyles<typeof styles> {}
  export interface States {
    tabValue: number;
  }
}

export const StationSongs = withStyles(styles)(CoreStationSongs);

export namespace StationSongs {
  export interface Props extends Identifiable {
    params: RealTimeStationPlayerQuery.Variables;
  }
}
