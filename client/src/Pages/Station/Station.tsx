import { Card, Drawer, Grid, Tab, Tabs, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { HorizontalStation } from 'Components';
import { AllStations } from 'RadioGraphql';
import * as React from 'react';
import { Query } from 'react-apollo';
import { styles } from './styles';

class CoreStation extends React.Component<CoreStation.Props, CoreStation.States> {
  constructor(props: CoreStation.Props) {
    super(props);

    this.state = {
      tabValue: 0
    };
  }
  public render(): React.ReactNode {
    const { classes } = this.props;
    const { tabValue } = this.state;
    return (
      <div className={classes.root}>
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
          {this.getAllStations()}
        </Drawer>
        <Grid container spacing={16} className={classes.container}>
          <Grid item xs={9}>
            <Card>
              <Tabs
                value={tabValue}
                onChange={this.handleTabChange}
                indicatorColor={'primary'}
                textColor={'primary'}
                scrollable
                scrollButtons={'auto'}
              >
                <Tab label={'Player'} />
                <Tab label={'Playlist'} />
                <Tab label={'History'} />
                <Tab label={'Favorite'} />
              </Tabs>
              {tabValue === 0 && this.TabContainer('Player here')}
              {tabValue === 1 && this.TabContainer('Playlist here')}
              {tabValue === 2 && this.TabContainer('History here')}
              {tabValue === 3 && this.TabContainer('Favorite here')}
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>Chat here</Card>
          </Grid>
        </Grid>
      </div>
    );
  }

  private TabContainer = (children: React.ReactNode): React.ReactElement<{}> => {
    return <div>{children}</div>;
  };

  private getAllStations = (): React.ReactElement<{}> => {
    return (
      <Query query={AllStations.getAllStationsQuery}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error: ${error.message}`;

          return data.allStations.map((station: AllStations.Station) => (
            <HorizontalStation key={station.stationId} station={station} />
          ));
        }}
      </Query>
    );
  };

  private handleTabChange = (event: React.ChangeEvent<{}>, value: number): void => {
    this.setState({
      tabValue: value
    });
  };
}

namespace CoreStation {
  export interface Props extends Station.Props, WithStyles<typeof styles> {}
  export interface States extends Station.States {}
}

export const Station: React.ComponentType<Station.Props> = withStyles(styles)(CoreStation);

export namespace Station {
  export interface Props extends Identifiable, Styleable {}
  export interface States {
    tabValue: number;
  }
}
