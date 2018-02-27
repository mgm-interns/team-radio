import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { LinearProgress } from 'material-ui/Progress';

const ACCEPTABLE_DELAY = 1;
class Player extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      played: 0,
      buffer: 0,
      seektime: props.seektime,
      receivedAt: props.receivedAt,
      isPaused: false,
    };
    this._onStart = this._onStart.bind(this);
    this._onPause = this._onPause.bind(this);
    this._onPlay = this._onPlay.bind(this);
    this._onProgress = this._onProgress.bind(this);
    this.seekToTime = this.seekToTime.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Force update seektime when component receive new props
    this.setState({
      seektime: nextProps.seektime,
      receivedAt: nextProps.receivedAt,
    });
    this.seekToTime(nextProps);
  }

  // Prevent calling render when isPaused changed
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isPaused === nextState.isPaused;
  }

  seekToTime({ seektime, receivedAt }) {
    this.playerRef.seekTo(Player._getExactlySeektime({ seektime, receivedAt }));
  }

  static _getExactlySeektime({ seektime, receivedAt }) {
    const currentTime = new Date().getTime();
    const delayedTime = parseInt(currentTime - receivedAt, 10) / 1000;
    return Math.abs(seektime + delayedTime);
  }

  _onStart() {
    this.seekToTime(this.state);
  }

  _onProgress({ played, loaded, playedSeconds }) {
    this.setState({
      played: played * 100,
      buffer: loaded * 100,
    });
    const exactlyTime = Player._getExactlySeektime(this.state);
    const differentTime = Math.abs(exactlyTime - playedSeconds);
    if (differentTime > ACCEPTABLE_DELAY) {
      this.playerRef.seekTo(exactlyTime);
    }
  }
  _onPause() {
    this.setState({
      isPaused: true,
    });
  }

  _onPlay() {
    if (this.state.isPaused) {
      this.setState({
        isPaused: false,
      });
      const exactlyTime = Player._getExactlySeektime(this.state);
      this.playerRef.seekTo(exactlyTime);
    }
  }
  render() {
    const {
      receivedAt, // unused
      songId, // unused
      playing,
      showProgressbar,
      url,
      enablePointerEvent,
      ...othersProps
    } = this.props;
    const { played, buffer } = this.state;
    return [
      <ReactPlayer
        key={1}
        url={url}
        ref={input => {
          this.playerRef = input;
        }}
        controls={false}
        playing={playing}
        onStart={this._onStart}
        onPlay={this._onPlay}
        onPause={this._onPause}
        onProgress={this._onProgress}
        youtubeConfig={{ playerVars: { disablekb: 1 } }}
        style={{ pointerEvents: enablePointerEvent }}
        {...othersProps}
      />,
      showProgressbar &&
        url && (
          <LinearProgress
            key={2}
            mode={'buffer'}
            value={played}
            valueBuffer={buffer}
          />
        ),
    ];
  }
}

Player.propTypes = {
  url: PropTypes.string,
  ref: PropTypes.object,
  seektime: PropTypes.number,
  receivedAt: PropTypes.number,
  songId: PropTypes.any,
  playing: PropTypes.bool,
  showProgressbar: PropTypes.bool,
};

Player.defaultProps = {
  width: '100%',
  height: '100%',
};

export default Player;
