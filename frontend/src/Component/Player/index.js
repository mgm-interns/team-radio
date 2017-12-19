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

  static defaultProps = {
    width: '100%',
    height: '100%',
  };

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
        onPlay={onPlay}
        onPause={onPause}
        youtubeConfig={{ playerVars: { disablekb: 1 } }}
        style={{ 'pointer-events': 'none' }}
        {...othersProps}
      />
    );
  }
}

export default Player;
