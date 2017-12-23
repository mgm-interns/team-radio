import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

const STATION_DEFAULT = {
  number: 1,
  name: 'mgm internship 2017',
};

class AddLink extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      video: {},
      videoId: '',
      searchText: '',
      isDisableButton: true,
      isAddLinkProgress: false,
    };
    this._onChange = this._onChange.bind(this);
    this._onSendClick = this._onSendClick.bind(this);
    this._renderLinkBoxSection = this._renderLinkBoxSection.bind(this);
    this._renderPreviewSection = this._renderPreviewSection.bind(this);
  }

  _checkValidUrl(url) {
    const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const matches = url.match(p);
    if (matches) {
      return matches[1];
    }
    return false;
  }

  async _getVideoInfo(id) {
    const { data: { items } } = await axios.get(
      `${process.env.REACT_APP_YOUTUBE_API_URL}/videos`,
      {
        params: {
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
          part: 'id,snippet',
          id,
        },
      },
    );
    return items;
  }

  // _debounce(func, wait) {
  //   let timeout;
  //   return (...args) => {
  //     const context = this;
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => func.apply(context, args), wait);
  //   };
  // }

  async _onChange(value) {
    this.setState({ isAddLinkProgress: true });
    try {
      if (value !== '') {
        if (!this._checkValidUrl(value)) {
          this.setState({ video: {}, isDisableButton: true });

          // const data = await axios.get(`${API_URL}search`, {
          //   params: {
          //     key: API_KEY,
          //     q: 'chrismas',
          //     part: 'snippet',
          //     safeSearch: 'strict',
          //     type: 'video',
          //     relevanceLanguage: 'en',
          //   },
          // });
          // console.log(data.data.items);
        } else {
          this.setState({ isDisableButton: false });
          const id = this._checkValidUrl(value);
          const data = await this._getVideoInfo(id);
          this.setState({
            video: { ...data[0] },
            videoId: id,
          });
        }
      } else {
        this.setState({ video: {}, isDisableButton: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        this.setState({ isAddLinkProgress: false });
      }, 600);
    }
  }

  _onSendClick() {
    console.log(this.state.videoId);
  }

  _renderLoading() {
    const { classes } = this.props;

    return (
      <Grid
        container
        className={classes.loadingContainer}
        justify="center"
        alignItems="center"
      >
        <CircularProgress color="primary" thickness={3} size={20} />
      </Grid>
    );
  }

  _renderEmptyComponent() {
    const { classes } = this.props;

    return (
      <Grid
        container
        className={classes.loadingContainer}
        justify="center"
        alignItems="center"
      >
        <span>Not found</span>
      </Grid>
    );
  }

  _renderLinkBoxSection() {
    const { classes } = this.props;
    const { isDisableButton } = this.state;

    return (
      <Grid item md={5} xs={12} className={classes.addLinkBoxLeft}>
        <Grid
          container
          className={classes.gridContainer}
          direction="column"
          justify="space-between"
        >
          <Grid item xs={12}>
            <TextField
              className={classes.linkInput}
              id="search"
              name="search"
              placeholder="Add your link..."
              autoComplete="search"
              fullWidth
              onChange={e => {
                this._onChange(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.sendBtn}
              raised
              color="primary"
              disabled={isDisableButton}
              onClick={this._onSendClick}
            >
              Add <Icon className={classes.sendIcon}>send</Icon>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  _renderPreviewSection() {
    const { classes } = this.props;
    const { video, isAddLinkProgress } = this.state;

    let view = null;
    if (video.id === undefined) {
      view = this._renderEmptyComponent();
    } else if (isAddLinkProgress) {
      view = this._renderLoading();
    } else {
      view = (
        <Grid container className={classes.content}>
          <Grid item sm={4} xs={12} className={classes.previewImg}>
            <img
              src={video.snippet.thumbnails.medium.url}
              className={classes.previewImg}
            />
          </Grid>
          <Grid item sm={8} xs={12}>
            <p className={classes.previewTitle}>{video.snippet.title}</p>
            <p className={classes.secondaryTitle}>
              Channel: {video.snippet.channelTitle}
            </p>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid item md={7} xs={12} className={classes.addLinkBoxRight}>
        {view}
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.addLinkContainer}>
        <Grid item xs={12} className={classes.linkTitle}>
          <div>
            <h1 className={classes.primaryTitle}>
              ADD TO STATION {STATION_DEFAULT.number}
            </h1>
            <span className={classes.secondaryTitle}>
              {' '}
              - {STATION_DEFAULT.name}
            </span>
          </div>
        </Grid>
        <Card className={classes.addLinkBox}>
          <Grid item xs={12}>
            <Grid container className={classes.gridContainer}>
              {this._renderLinkBoxSection()}
              {this._renderPreviewSection()}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(AddLink);
