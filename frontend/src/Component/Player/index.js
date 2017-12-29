import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
// import { transformNumber } from '../../Transformer';

class Player extends Component {
  static propTypes = {
    url: PropTypes.string,
    ref: PropTypes.object,
    seektime: PropTypes.number,
    playing: PropTypes.bool,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
  };

  static defaultProps = {
    width: '100%',
    height: '100%',
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      startAt: null,
    };
    this._onStart = this._onStart.bind(this);
  }

  _onStart() {
    const { seektime } = this.props;
    this.refPlayer.seekTo(seektime);
  }

  render() {
    const { url, playing, onPlay, onPause, ...othersProps } = this.props;
    return (
      <ReactPlayer
        url={url}
        ref={input => {
          this.refPlayer = input;
        }}
        controls={false}
        playing={playing}
        muted={true}
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

export default Player;
