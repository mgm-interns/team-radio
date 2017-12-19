import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Item from './Item';
import playlist from './fixtures';
import styles from './styles';

class Playlist extends Component {
  render() {
    const { className, style } = this.props;
    return (
      <Grid
        item
        xs={12}
        className={className}
        style={{ ...style, overflowY: 'auto' }}
      >
        <List>
          {playlist.map((video, index) => <Item key={index} {...video} />)}
        </List>
      </Grid>
    );
  }
}

Playlist.propTypes = {
  className: PropTypes.any,
  style: PropTypes.any,
};

export default withStyles(styles)(Playlist);
