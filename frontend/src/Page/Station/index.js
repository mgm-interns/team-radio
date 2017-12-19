import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import AddLink from './AddLink';
import Playlist from './Playlist';
import NowPlaying from './NowPlaying';
import StationSwitcher from './../../Component/StationSwitcher';
import fixture from '../../Fixture/landing';

import styles from './styles';

const VIDEO_DEFAULT = {
  name: '3 Hours of Christmas Music - Holiday Classics with the best new stuff',
  thumbnail:
    'https://upload.wikimedia.org/wikipedia/en/c/cb/Meghan_Trainor_Title_EP_Album_Cover.png',
};

class StationPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid direction="row" container style={{ margin: 0, width: '100%' }}>
        <Grid item xs={12} md={12} lg={12}>
          <StationSwitcher stationList={fixture.stations}/>
        </Grid>
        
        <Grid item xs={12} md={7} lg={9}>
          <Grid container>
            <Grid item xs={12}>
              <h1>MY STATION</h1>
            </Grid>
            <NowPlaying className={classes.content} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} lg={3}>
          <Grid container>
            <Grid item xs={12}>
              <h1>NOW PLAYING</h1>
            </Grid>
            <Playlist className={classes.content} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AddLink video_detail={VIDEO_DEFAULT} />
        </Grid>
      </Grid>
    );
  }
}

StationPage.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(StationPage);
