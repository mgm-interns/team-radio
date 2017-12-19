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

const VIDEO_DEFAULT = {
  title: 'Video Title',
  url: 'https://www.youtube.com/watch?v=iDmIX00yUi4',
  thumbnail:
    'https://upload.wikimedia.org/wikipedia/en/c/cb/Meghan_Trainor_Title_EP_Album_Cover.png',
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
      isAddLinkProgress: true,
    };
    this._onChange = this._onChange.bind(this);
    this._onSendClick = this._onSendClick.bind(this);
  }

  _getVideoId(url) {
    return url.split('v=')[1];
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

  async componentDidMount() {
    try {
      const data = await this._getData(this._getVideoId(VIDEO_DEFAULT.url));
      this.setState({ video: { ...data[0] }, isAddLinkProgress: false }, () => {
        this.tempVideo = this.state.video;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async _onChange(e) {
    this.setState({ isAddLinkProgress: true });
    try {
      if (e.target.value !== '') {
        const data = await this._getData(this._getVideoId(e.target.value));
        this.setState({
          video: { ...data[0] },
          isDisableButton: false,
        });
      } else {
        this.setState({ video: { ...this.tempVideo }, isDisableButton: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        this.setState({ isAddLinkProgress: false });
      }, 600);
    }
  }

  _onSendClick() {}

  render() {
    const { video, isDisableButton, isAddLinkProgress } = this.state;
    const { classes } = this.props;
    return (
      <Grid direction="row" container style={{ margin: 0, width: '100%' }}>
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
          <AddLink
            placeholder={VIDEO_DEFAULT.url}
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
