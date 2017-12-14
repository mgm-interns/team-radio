import React, { Component } from 'react';
// import { Helmet } from 'react-helmet';
import YouTube from 'react-youtube';
// import styles from './styles.scss';

const PLAYLIST = [
  'https://www.youtube.com/watch?v=igSCSQ9fg14',
  'https://www.youtube.com/watch?v=ZVc3vSyBC_c',
  'https://www.youtube.com/watch?v=SGgzaiFIYV4',
  'https://www.youtube.com/watch?v=Q7vuCH-8axg',
  'https://www.youtube.com/watch?v=gaObISjSiBM',
];

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: [],
      video: '',
      text: '',
      isPlay: true,
    };
    this._onItemClick = this._onItemClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onAddClick = this._onAddClick.bind(this);
    this._onButtonClick = this._onButtonClick.bind(this);
    this._renderVideo = this._renderVideo.bind(this);
    this._onReady = this._onReady.bind(this);
    this._onStateChange = this._onStateChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      playlist: [...PLAYLIST],
      video: PLAYLIST[0],
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('should update');
    // console.log(nextState);
    // console.log(this.state);
    if (nextState.isPlay !== this.state.isPlay || nextState.video !== '') {
      return true;
    }
    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('will update');
    // console.log(nextState);
    // console.log(this.state);
    if (nextState.isPlay !== this.state.isPlay) {
      this.setState({ isPlay: nextState.isPlay });
    }
  }

  _getVideoId(url) {
    return url.split('v=')[1];
  }

  _onItemClick(item) {
    this.setState({
      video: item,
    });
  }

  _onChange(e) {
    const text = e.target.value;
    this.setState({ text: text });
  }

  _onAddClick() {
    this.setState({
      playlist: [...PLAYLIST, ...PLAYLIST.push(this.state.text)],
    });
  }

  _onButtonClick() {
    this.setState({ isPlay: !this.state.isPlay }, () => {
      console.log('after clicked: ', this.state.isPlay);
    });
  }

  _onReady(e) {
    e.target.playVideo();
  }

  _onStateChange(e) {
    // console.log(e.data);
    // console.log('on state change: ',this.state);
    if (e.data === YouTube.PlayerState.PLAYING && !this.state.isPlay) {
      e.target.pauseVideo();
    }
    if (e.data === YouTube.PlayerState.PAUSED && this.state.isPlay) {
      e.target.playVideo();
    }
  }

  _renderVideo() {
    const { video } = this.state;
    const opts = {
      width: '640',
      height: '390',
      playerVars: {
        autoplay: 1,
        enablejsapi: 1,
      },
    };

    return (
      <YouTube
        id="player"
        videoId={this._getVideoId(video)}
        opts={opts}
        onReady={this._onReady}
        onStateChange={e => this._onStateChange(e)}
      />
    );
  }

  render() {
    return (
      <div>
        <h1>Playlist</h1>
        {this._renderVideo()}
        <div>
          <ul>
            {PLAYLIST.map((item, index) => {
              return (
                <li key={index}>
                  <button
                    className="item"
                    onClick={() => this._onItemClick(item)}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <input
            type="text"
            value={this.state.text}
            onChange={this._onChange}
          />
          <div>
            <button onClick={this._onAddClick}>Add</button>
            <button onClick={this._onButtonClick}>Play</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
