import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { LinearProgress } from 'material-ui/Progress';

const ACCEPTABLE_DELAY = 0.5;
class Player extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      played: 0,
      buffer: 0,
      seektime: this.props.seektime,
      receivedAt: this.props.receivedAt,
    };

    this._onStart = this._onStart.bind(this);
    this._onProgress = this._onProgress.bind(this);
    this.seekToTime = this.seekToTime.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Force update seektime when component receive new props
    if (this.props.seektime !== nextProps.seektime) {
      this.setState({
        played: this.state.played,
        buffer: this.state.played,
        seektime: nextProps.seektime,
        receivedAt: nextProps.receivedAt,
      });
      this.seekToTime(nextProps);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.seektime !== nextProps.seektime) {
      return false;
    }
    return true;
  }

  seekToTime({ seektime, receivedAt }) {
    this.playerRef.seekTo(Player._getExactlySeektime({ seektime, receivedAt }));
  }

  static _getExactlySeektime({ seektime, receivedAt }) {
    const currentTime = new Date().getTime();
    const delayedTime = parseInt(currentTime - receivedAt, 10) / 1000;
    return seektime + delayedTime;
  }

  _onStart() {
    this.seekToTime(this.props);
  }

  _onProgress({ played, loaded, playedSeconds }) {
    this.setState({
      played: played * 100,
      buffer: loaded * 100,
      seektime: this.state.seektime,
      receivedAt: this.state.receivedAt,
    });
    const exactlyTime = Player._getExactlySeektime(this.state);
    const differentTime = exactlyTime - playedSeconds;
    if (
      differentTime > ACCEPTABLE_DELAY ||
      differentTime < ACCEPTABLE_DELAY * -1
    ) {
      this.playerRef.seekTo(exactlyTime);
    }
  }

  render() {
    const {
      receivedAt, // unused
      songId, // unused
      url,
      playing,
      showProgressbar,
      onPlay,
      onPause,
      ...othersProps
    } = this.props;
    const { played, buffer } = this.state;
    return [
      <ReactPlayer
        start={0}
        key={1}
        url={url}
        ref={input => {
          this.playerRef = input;
        }}
        controls={true}
        playing={playing}
        onStart={this._onStart}
        onPlay={onPlay}
        onPause={onPause}
        onProgress={this._onProgress}
        youtubeConfig={{ playerVars: { disablekb: 1 } }}
        // style={{ pointerEvents: 'none' }}
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
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  showProgressbar: PropTypes.bool,
};

Player.defaultProps = {
  width: '100%',
  height: '100%',
};

export default Player;
