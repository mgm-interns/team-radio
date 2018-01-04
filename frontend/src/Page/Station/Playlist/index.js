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
    const notPlayedList = playlist
      ? playlist.filter(song => song.is_played === false)
      : [];
    if (notPlayedList[0]) {
      notPlayedList[0].playing = true;
    }
    return (
      <Grid
        item
        xs={12}
        className={className}
        style={{ ...style, overflowY: 'auto' }}
      >
        <List style={{ paddingTop: 0, paddingBottom: 0 }}>
          {notPlayedList.map((video, index) => <Item key={index} {...video} />)}
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
  playlist: state.api.currentStation.playlist,
});

export default compose(withStyles(styles), connect(mapStateToProps))(Playlist);
