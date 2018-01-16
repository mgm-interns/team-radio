import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRouter from 'react-router-dom/withRouter';
import { addSong } from 'Redux/api/currentStation/actions';
import Grid from 'material-ui/Grid';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';
import { Images } from 'Theme';
import styles from './styles';

/* eslint-disable no-shadow */
/* eslint-disable camelcase */
class HistoryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      replay: false,
    };

    this._onReplayClick = this._onReplayClick.bind(this);
  }

  _onReplayClick() {
    const {
      addSong,
      match: { params: { stationId } },
      user: { userId, username, name, avatar_url },
      url,
      title,
      thumbnail,
    } = this.props;
    addSong({
      songUrl: url,
      title,
      thumbnail,
      stationId,
      userId,
      creator: { username, name, avatar_url },
    });
  }

  render() {
    const { thumbnail, title, creator, classes } = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid item xs={3} className={classes.thumbnail}>
          <img className={classes.img} src={thumbnail} />
        </Grid>
        <Grid item xs={8} className={classes.info}>
          <div className={classes.name}>{title}</div>
          <div className={classes.creator}>
            Added by
            {creator === null ? (
              ' Unregistered User'
            ) : (
              <Tooltip placement={'bottom'} title={creator.name}>
                <img
                  src={creator.avatar_url || Images.avatar.male01}
                  className={classes.creatorAvatar}
                  onClick={this._onCreatorIconClicked}
                />
              </Tooltip>
            )}
          </div>
        </Grid>
        <Grid item xs={1} className={classes.actions}>
          <IconButton
            className={classes.action}
            color="default"
            onClick={this._onReplayClick}
          >
            replay
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

HistoryItem.propTypes = {
  classes: PropTypes.any,
  url: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.any,
  creator: PropTypes.object,
  addSong: PropTypes.func,
  match: PropTypes.any,
  user: PropTypes.object,
  replayRequest: PropTypes.func,
};

const mapStateToProps = ({ api }) => ({
  user: api.user.data,
});

const mapDispatchToProps = dispatch => ({
  addSong: option => dispatch(addSong(option)),
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(HistoryItem);
