import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Item from './Item';
import styles from './styles';

class FavouriteVideos extends Component {
  render() {
    const { className, style, data } = this.props;
    return (
      <Grid
        item
        xs={12}
        className={className}
        style={{ ...style, overflowY: 'auto', overflowX: 'hidden' }}
      >
        <List style={{ paddingTop: 0, paddingBottom: 0 }}>
          {data.map((video, index) => (
            <Item key={video.song_id || index} {...video} />
          ))}
        </List>
      </Grid>
    );
  }
}

FavouriteVideos.propTypes = {
  className: PropTypes.any,
  classes: PropTypes.object,
  style: PropTypes.any,
  data: PropTypes.array,
};

export default compose(withStyles(styles))(FavouriteVideos);
