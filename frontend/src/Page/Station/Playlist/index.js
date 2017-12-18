import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import Item from './Item';
import playlist from './fixtures';
import './styles.css';

class Playlist extends Component {
  render() {
    const { style } = this.props;
    return (
      <Grid item xs={12} style={{ ...style, overflowY: 'auto' }}>
        <List>
          {playlist.map((video, index) => <Item key={index} {...video} />)}
        </List>
      </Grid>
    );
  }
}

Playlist.propTypes = {
  style: PropTypes.any,
};

export default Playlist;
