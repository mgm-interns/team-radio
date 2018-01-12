import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import { Player } from 'Component';
import ThumbDownIcon from 'react-icons/lib/fa/thumbs-down';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import sleep from 'Util/sleep';
import styles from './styles';

class NowPlaying extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refPlayer: null,
      skipNotification: false,
      countDown: 0,
    };
    this.renderSkipNotification = this.renderSkipNotification.bind(this);
    this.setStateAsync = this.setStateAsync.bind(this);
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async componentWillReceiveProps(nextProps) {
    const { currentStation } = this.props;
    const nextCurrentStation = nextProps.currentStation;
    // only trigger when received a new skip notification
    if (currentStation.skip._id !== nextCurrentStation.skip._id) {
      // Show notification
      await this.setStateAsync({
        skipNotification: true,
        countDown: nextCurrentStation.skip.delay,
      });
      // After start the count down, decrease countDown value per second
      const countDownInterval = setInterval(() => {
        // Stop counting when count to 0
        if (this.state.countDown > 0) {
          this.setState({
            countDown: this.state.countDown - 1000,
          });
        }
      }, 1000);
      // Wait util complete the delay
      // Add 1 more delay second to prevent bad loading behavior
      await sleep(nextCurrentStation.skip.delay + 1000);
      clearInterval(countDownInterval);
      // Turn it off and show player again
      await this.setStateAsync({
        skipNotification: false,
        countDown: 0,
      });
    }
  }

  renderSkipNotification() {
    const { className, classes, currentStation } = this.props;
    return (
      <Grid item xs={12} className={className}>
        <Grid
          container
          justify={'center'}
          alignItems={'center'}
          alignContent={'center'}
          direction={'column'}
          className={classes.skipNotificationContainer}
          style={{ backgroundImage: `url(${currentStation.skip.thumbnail})` }}
        >
          <div className={classes.skipNotificationBackdrop} />
          <ThumbDownIcon className={classes.skipNotificationIcon} />
          <Typography
            type={'title'}
            align={'center'}
            className={classes.skipNotificationText}
          >
            {`Our listeners don't like this song.`}
            <br />
            It will be skipped in {this.state.countDown / 1000}...
            <br />
            {/* For more information about the skipping rule, refer to this link. */}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { className, nowPlaying, autoPlay, muted } = this.props;
    console.log(this.state.skipNotification);
    return this.state.skipNotification ? (
      this.renderSkipNotification()
    ) : (
      <Grid item xs={12} className={className}>
        <Player
          url={nowPlaying ? nowPlaying.url : ''}
          playing={autoPlay}
          seektime={parseInt(nowPlaying && nowPlaying.starting_time, 10) / 1000}
          muted={muted}
        />
      </Grid>
    );
  }
}

NowPlaying.propTypes = {
  style: PropTypes.any,
  className: PropTypes.any,
  nowPlaying: PropTypes.object,
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool,
  classes: PropTypes.object,
  currentStation: PropTypes.object,
};

const mapStateToProps = ({ api: { currentStation } }) => ({
  currentStation,
});

export default compose(connect(mapStateToProps), withStyles(styles))(
  NowPlaying,
);
