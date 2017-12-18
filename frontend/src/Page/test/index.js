import React, { Component } from 'react';
import { transformNumber } from '../../Transformer';
import { Player } from '../../Component';

const PLAYLIST = [
  'https://www.youtube.com/watch?v=igSCSQ9fg14',
  // 'https://www.youtube.com/watch?v=ZVc3vSyBC_c',
  // 'https://www.youtube.com/watch?v=SGgzaiFIYV4',
  // 'https://www.youtube.com/watch?v=Q7vuCH-8axg',
  // 'https://www.youtube.com/watch?v=gaObISjSiBM',
];

class MediaPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: {
        isPlaying: true,
        pausedAt: 0,
      },
      refPlayer: null,
      text: '',
    };
    this._onInputChange = this._onInputChange.bind(this);
    // this._onAdd = this._onAdd.bind(this);
    this._onActionClick = this._onActionClick.bind(this);
    this._getRefPlayer = this._getRefPlayer.bind(this);
    this._onPlay = this._onPlay.bind(this);
    this._onPause = this._onPause.bind(this);
  }

  /* Get player DOM */
  _getRefPlayer(ref) {
    const result = ref.refPlayer;
    this.setState({ refPlayer: result });
  }
  /* End of getting player DOM */

  /* Add a media link */
  _onInputChange(e) {
    const text = e.target.value;
    this.setState({ text });
  }

  // _onAdd() {}
  /* End of adding a media link */

  /* Pause or Play a video */
  _onActionClick() {
    this.setState({
      player: {
        isPlaying: !this.state.player.isPlaying,
      },
    });
  }
  /* End of handling action button (pause/play) */

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
  /* End of handling player actions */

  _renderVideo() {
    const url = PLAYLIST[0];
    const { player: { isPlaying } } = this.state;
    return (
      <Player
        url={url}
        ref={this._getRefPlayer}
        playing={isPlaying}
        onPlay={this._onPlay}
        onPause={this._onPause}
      />
    );
  }

  render() {
    const { player } = this.state;

    return (
      <div>
        <h1>Playlist</h1>
        {this._renderVideo()}
        <div>
          <ul>
            {PLAYLIST.map((item, index) => (
              <li key={index}>
                <p className="item">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {/*
         <div>
            <input
              type="text"
              placeholder="Add your link..."
              onClick={this._onInputChange}
            />
          </div>
        */}
          <button onClick={this._onActionClick}>Action</button>
          <p>
            Paused at:{' '}
            {transformNumber.convertNumberToTime(
              !player.isPlaying && player.pausedAt,
            )}
          </p>
        </div>
      </div>
    );
  }
}

export default MediaPlayer;
