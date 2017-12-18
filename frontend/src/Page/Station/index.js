import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import AddLink from './AddLink';
import Playlist from './Playlist';

class StationPage extends Component {
  render() {
    return (
      <div>
        <h1>Station Page</h1>
        {/*
          <AddLink />
        */}
        <Grid xs={4}>
          <Playlist />
        </Grid>
      </div>
    );
  }
}

StationPage.propTypes = {};

export default StationPage;
