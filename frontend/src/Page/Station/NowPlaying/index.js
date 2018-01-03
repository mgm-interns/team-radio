import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import { Player } from 'Component';

class NowPlaying extends Component {
  static propTypes = {
    style: PropTypes.any,
    className: PropTypes.any,
    nowPlaying: PropTypes.object,
    autoPlay: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      refPlayer: null,
    };
    // this._getRefPlayer = this._getRefPlayer.bind(this);
  }

  /* Get player DOM */
  // _getRefPlayer(ref) {
  //   if (ref) {
  //     const result = ref.refPlayer;
  //     this.setState({ refPlayer: result });
  //   }
  // }

  render() {
    const { className, nowPlaying, autoPlay } = this.props;
    return (
      <Grid item xs={12} className={className}>
        <Player
          url={nowPlaying ? nowPlaying.url : ''}
          // ref={this._getRefPlayer}
          playing={autoPlay}
          seektime={parseInt(nowPlaying && nowPlaying.starting_time, 10) / 1000}
          muted={false}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  nowPlaying: state.api.currentStation.nowPlaying,
});

export default connect(mapStateToProps)(NowPlaying);
