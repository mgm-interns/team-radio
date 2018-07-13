import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import { Player } from 'Component';
import ReactEmojiMixin from 'react-emoji';
import ThumbDownIcon from 'react-icons/lib/fa/thumbs-down';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import CountDown from './Countdown';
import styles from './styles';

class NowPlaying extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refPlayer: null,
      seektime: null,
      receivedAt: new Date().getTime(),
    };
    this.renderSkipNotification = this.renderSkipNotification.bind(this);
    this.setStateAsync = this.setStateAsync.bind(this);
  }

  static calculateSeekTime(start) {
    return parseInt(start, 10) / 1000;
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async componentWillReceiveProps(nextProps) {
    // Force player to re-render after the song has changed
    const { nowPlaying } = this.props;
    const nextNowPlaying = nextProps.nowPlaying;
    // Only trigger when the song_id has changed
    if (nowPlaying.song_id !== nextNowPlaying.song_id) {
      const player = {
        seektime: NowPlaying.calculateSeekTime(nextNowPlaying.starting_time),
        receivedAt: new Date().getTime(),
      };
      this.setState(player);
      if (this.playerRef) {
        this.playerRef.seekToTime(player);
      }
    }
  }

  renderSkipNotification() {
    const { className, classes, skip } = this.props;
    return (
      <Grid item xs={12} className={className}>
        <Grid
          container
          justify={'center'}
          alignItems={'center'}
          alignContent={'center'}
          direction={'column'}
          className={classes.skipNotificationContainer}
          style={{
            backgroundImage: `url(${skip && skip.thumbnail})`,
          }}
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
            It will be skipped in <CountDown delay={skip.delay} />....
            {/* <br /> */}
            {/* For more information about the skipping rule, refer to this link. */}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  render() {
    const {
      classes,
      className,
      nowPlaying,
      autoPlay,
      muted,
      skip,
    } = this.props;
    if (!nowPlaying.receivedAt) {
      nowPlaying.receivedAt = new Date().getTime();
    }
    return skip ? (
      this.renderSkipNotification()
    ) : (
      <Grid item xs={12} className={classNames([className, classes.container])}>
        <Player
          songId={nowPlaying.song_id}
          url={nowPlaying ? nowPlaying.url : ''}
          playing={autoPlay}
          seektime={NowPlaying.calculateSeekTime(nowPlaying.starting_time)}
          receivedAt={nowPlaying.receivedAt}
          showProgressbar
          muted={muted}
          enablePointerEvent={'none'}
          ref={ref => {
            this.playerRef = ref;
          }}
        />
        {nowPlaying.message &&
          nowPlaying.message.content && (
            <marquee
              className={classes.marquee}
              behavior="scroll"
              direction="left"
            >
              {ReactEmojiMixin.emojify(nowPlaying.message.content, {
                attributes: { width: 12, height: 12 },
              })}
            </marquee>
          )}
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
  skip: PropTypes.object,
};

const mapStateToProps = ({ api: { currentStation } }) => ({
  skip: currentStation.skip,
  nowPlaying: currentStation.nowPlaying,
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(NowPlaying);
