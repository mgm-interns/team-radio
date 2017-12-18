import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import AddLink from './AddLink';
import Playlist from './Playlist';
import NowPlaying from './NowPlaying';

const maxHeight = '600px';

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
          <Grid container>
            <Grid item xs={12}>
              <h1>My Station</h1>
            </Grid>
            <NowPlaying style={{ height: maxHeight }} />
          </Grid>
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <Grid container>
            <Grid item xs={12}>
              <h1>Now Playing</h1>
            </Grid>
            <Playlist style={{ maxHeight }} />
          </Grid>
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
