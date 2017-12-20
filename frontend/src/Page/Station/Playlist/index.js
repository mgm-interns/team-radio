import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Item from './Item';
import styles from './styles';

class Playlist extends Component {
  render() {
    const { playlist, className, style } = this.props;
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
  playlist: PropTypes.array,
};

const mapStateToProps = state => ({
  playlist: state.api.playlist.playlist,
});

export default compose(withStyles(styles), connect(mapStateToProps))(Playlist);
