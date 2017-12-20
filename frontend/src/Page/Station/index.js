import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import AddLink from './AddLink';
import Playlist from './Playlist';
import NowPlaying from './NowPlaying';
import styles from './styles';

class StationPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid direction="row" container style={{ margin: 0, width: '100%' }}>
        <Grid item xs={12} md={8} lg={9}>
          <Grid container>
            <Grid item xs={12}>
              <h1>MY STATION</h1>
            </Grid>
            <NowPlaying className={classes.content} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Grid container>
            <Grid item xs={12}>
              <h1>NOW PLAYING</h1>
            </Grid>
            <Playlist className={classes.content} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <AddLink />
        </Grid>
      </Grid>
    );
  }
}

StationPage.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(StationPage);
