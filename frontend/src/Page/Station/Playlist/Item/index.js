import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import withTheme from 'material-ui/styles/withTheme';
import './styles.css';

class PlaylistItem extends Component {
  render() {
    const {
      thumbnail,
      name,
      score,
      singer,
      uploader,
      isUpvoted,
      playing,
      theme: { palette },
    } = this.props;
    const primaryColor = palette.primary['600'];
    const secondaryColor = palette.secondary['600'];
    return (
      <Grid
        container
        className={`PlaylistItem-container ${playing ? 'playing' : ''}`}
      >
        <Grid item xs={3} className="PlaylistItem-thumbnail">
          <img className="PlaylistItem-img" src={thumbnail} alt="" />
        </Grid>
        <Grid item xs={7} className="PlaylistItem-info">
          <Grid className="PlaylistItem-name">{name}</Grid>
          <Grid className="PlaylistItem-singer">{singer}</Grid>
          <Grid className="PlaylistItem-uploader">Added by {uploader}</Grid>
        </Grid>
        <Grid item xs={2} className="PlaylistItem-actions">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ height: '100%' }}
          >
            <IconButton color={isUpvoted ? 'primary' : 'secondary'}>
              star
            </IconButton>
            <Grid
              className="PlaylistItem-score"
              style={{ color: isUpvoted ? primaryColor : secondaryColor }}
            >
              {score}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

PlaylistItem.propTypes = {
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  singer: PropTypes.string,
  uploader: PropTypes.string,
  isUpvoted: PropTypes.bool,
  theme: PropTypes.any,
  playing: PropTypes.bool,
};

export default withTheme()(PlaylistItem);
