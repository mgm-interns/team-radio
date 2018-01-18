import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

class Player extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this._onStart = this._onStart.bind(this);
    this.seekToTime = this.seekToTime.bind(this);
  }

  _onStart() {
    this.seekToTime(this.props);
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

  render() {
    const {
      receivedAt, // unused
      songId, // unused
      url,
      playing,
      onPlay,
      onPause,
      ...othersProps
    } = this.props;
    return (
      <ReactPlayer
        url={url}
        ref={input => {
          this.refPlayer = input;
        }}
        controls={false}
        playing={playing}
        onStart={this._onStart}
        onPlay={onPlay}
        onPause={onPause}
        youtubeConfig={{ playerVars: { disablekb: 1 } }}
        style={{ pointerEvents: 'none' }}
        {...othersProps}
      />
    );
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
};

Player.defaultProps = {
  width: '100%',
  height: '100%',
};

export default Player;
