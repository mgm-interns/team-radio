import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ReactPlayer from 'react-player';
import { LinearProgress } from 'material-ui/Progress';

class Player extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      played: 0,
      buffer: 0,
    };

    this._onStart = this._onStart.bind(this);
    this._onProgress = this._onProgress.bind(this);
    this.seekToTime = this.seekToTime.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Force update seektime when component receive new props
    if (this.props.seektime !== nextProps.seektime) {
      this.seekToTime(nextProps);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.seektime !== nextProps.seektime) {
      return false;
    }
    return true;
  }

  seekToTime({ seektime, receivedAt }) {
    const currentTime = new Date().getTime();
    const delayedTime = parseInt(currentTime - receivedAt, 10) / 1000;
    const exactlySeektime = seektime + delayedTime;
    this.refPlayer.seekTo(exactlySeektime);
  }

  _onStart() {
    this.seekToTime(this.props);
  }

  _onProgress(state) {
    this.setState({ played: state.played * 100, buffer: state.loaded * 100 });
  }

  render() {
    const {
      receivedAt, // unused
      songId, // unused
      nowPlaying,
      url,
      playing,
      onPlay,
      onPause,
      ...othersProps
    } = this.props;
    const { played, buffer } = this.state;
    return [
      <ReactPlayer
        key={1}
        url={url}
        ref={input => {
          this.refPlayer = input;
        }}
        controls={false}
        playing={playing}
        onStart={this._onStart}
        onPlay={onPlay}
        onPause={onPause}
        onProgress={this._onProgress}
        youtubeConfig={{ playerVars: { disablekb: 1 } }}
        style={{ pointerEvents: 'none' }}
        {...othersProps}
      />,
      nowPlaying.url && (
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
  nowPlaying: PropTypes.object,
};

Player.defaultProps = {
  width: '100%',
  height: '100%',
};

const mapStateToProps = ({ api }) => ({
  nowPlaying: api.currentStation.nowPlaying,
});

export default compose(connect(mapStateToProps, undefined))(Player);
