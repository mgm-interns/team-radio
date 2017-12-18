import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

class Player extends Component {
  static propTypes = {
    url: PropTypes.string,
    ref: PropTypes.object,
    playing: PropTypes.bool,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
  };

  render() {
    const { url, playing, onPlay, onPause } = this.props;
    return (
      <ReactPlayer
        url={url}
        ref={input => {
          this.refPlayer = input;
        }}
        controls
        playing={playing}
        onPlay={onPlay}
        onPause={onPause}
      />
    );
  }
}

export default Player;
