import React, { Component } from 'react';
import PlaylistItem from './PlaylistItem';

const style = {
  playlistContainer: {
    border: '1px solid #bfbfbf',
    padding: '10px',
  },
};

class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={style.playlistContainer}>
        <h1>Playlist</h1>
        {this.props.itemList.map((item, index) => (
          <PlaylistItem item={item} key={index} index={index} />
        ))}
      </div>
    );
  }
}

export default Playlist;
