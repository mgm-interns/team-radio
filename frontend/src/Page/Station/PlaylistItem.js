import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

const style = {
  playlistItemContainer: {},
  item: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10px',
  },
  index: {
    fontSize: '50px',
  },
  thumbnail: {
    height: '50px',
  },
  videoInfo: {
    marginLeft: '20px',
  },
  title: {
    fontSize: '20px',
  },
  singers: {
    color: '#BBB',
    padding: '5px',
  },
};

class PlaylistItem extends Component {
  getThumnail(videoId) {
    return `http://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  }
  render() {
    const { videoId, title, singers } = this.props.item;
    const index = this.props.index;

    return (
      <div style={style.playlistItemContainer}>
        <Grid container spacing={24}>
          <Grid item xs={1}>
            <h1 style={style.index}>{index + 1}</h1>
          </Grid>

          <Grid item xs={10}>
            <div style={style.item}>
              <img
                src={this.getThumnail(videoId)}
                alt=""
                style={style.thumbnail}
              />
              <div style={style.videoInfo}>
                <p style={style.title}>{title}</p>
                <p style={style.singers}>{singers}</p>
              </div>
            </div>
          </Grid>

          <Grid item xs={1} />
        </Grid>
      </div>
    );
  }
}

export default PlaylistItem;
