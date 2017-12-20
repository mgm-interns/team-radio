import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import AddLink from './AddLink';
import Playlist from './Playlist';
import NowPlaying from './NowPlaying';
import styles from './styles';

const STATION_DEFAULT = {
  number: 1,
  name: 'mgm internship 2017',
};

const API_KEY = 'AIzaSyD_HCz-IjU056WTFjBgWYmjjg1YnwRPXXM';
const API_URL = 'https://www.googleapis.com/youtube/v3/videos';

class StationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      video: {},
      videoId: '',
      isDisableButton: true,
      isAddLinkProgress: false,
    };
    this._onChange = this._onChange.bind(this);
    this._onSendClick = this._onSendClick.bind(this);
  }

  _checkValidUrl(url) {
    const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const matches = url.match(p);
    if (matches) {
      return matches[1];
    }
    return false;
  }

  async _getData(id) {
    const { data: { items } } = await axios.get(API_URL, {
      params: {
        part: 'id,snippet',
        id,
        key: API_KEY,
      },
    });
    return items;
  }

  async _onChange(e) {
    this.setState({ isAddLinkProgress: true });
    try {
      if (e.target.value !== '' && this._checkValidUrl(e.target.value)) {
        this.setState({ isDisableButton: false });
        const id = this._checkValidUrl(e.target.value);
        const data = await this._getData(id);
        this.setState({
          video: { ...data[0] },
          videoId: id,
        });
      } else {
        this.setState({ video: {}, isDisableButton: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        this.setState({ isAddLinkProgress: false });
      }, 300);
    }
  }

  _onSendClick() {
    console.log(this.state.videoId);
  }

  render() {
    const { video, isDisableButton, isAddLinkProgress } = this.state;
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
          <AddLink
            video={video}
            station={STATION_DEFAULT}
            isDisableButton={isDisableButton}
            isAddLinkProgress={isAddLinkProgress}
            onChange={this._onChange}
            onSendClick={this._onSendClick}
          />
        </Grid>
      </Grid>
    );
  }
}

StationPage.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(StationPage);
