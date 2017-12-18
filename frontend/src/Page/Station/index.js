import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import AddLink from './AddLink';
import Playlist from './Playlist';

const VIDEO_DEFAULT = {
  name: '3 Hours of Christmas Music - Holiday Classics with the best new stuff',
  thumbnail:
    'https://upload.wikimedia.org/wikipedia/en/c/cb/Meghan_Trainor_Title_EP_Album_Cover.png',
};

class StationPage extends Component {
  render() {
    return (
      <Grid direction="row" container style={{ margin: 0, width: '100%' }}>
        <Grid item xs={6} md={7} lg={8}>
          <h1>Station Page</h1>
        </Grid>
        <Grid item xs={6} md={5} lg={4}>
          <Playlist />
        </Grid>
        <Grid item xs={12}>
          <AddLink video_detail={VIDEO_DEFAULT} />
        </Grid>
      </Grid>
    );
  }
}

StationPage.propTypes = {};

export default StationPage;
