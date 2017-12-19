import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { Player } from '../../../Component';

const URL = 'https://www.youtube.com/watch?v=igSCSQ9fg14';

class NowPlaying extends Component {
  static propTypes = {
    style: PropTypes.any,
    className: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      player: {
        isPlaying: true,
        pausedAt: 0,
      },
      refPlayer: null,
    };
    this._onActionClick = this._onActionClick.bind(this);
    this._getRefPlayer = this._getRefPlayer.bind(this);
    this._onPlay = this._onPlay.bind(this);
    this._onPause = this._onPause.bind(this);
  }

  /* Get player DOM */
  _getRefPlayer(ref) {
    if (ref) {
      const result = ref.refPlayer;
      this.setState({ refPlayer: result });
    }
  }

  /* Add a media link */
  _onInputChange(e) {
    const text = e.target.value;
    this.setState({ text });
  }

  /* Pause or Play a video */
  _onActionClick() {
    this.setState({
      player: {
        isPlaying: !this.state.player.isPlaying,
      },
    });
  }

  /* Handle player actions */
  _onPlay() {
    this.setState({
      player: { isPlaying: true },
    });
  }

  _onPause() {
    const { refPlayer } = this.state;
    this.setState({
      player: { pausedAt: refPlayer.getCurrentTime(), isPlaying: false },
    });
  }

  render() {
    const { player: { isPlaying } } = this.state;
    const { className } = this.props;

    return (
      <Grid item xs={12} className={className}>
        <Player
          url={URL}
          ref={this._getRefPlayer}
          playing={isPlaying}
          onPlay={this._onPlay}
          onPause={this._onPause}
        />
      </Grid>
    );
  }
}

export default NowPlaying;
