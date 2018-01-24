import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { transformNumber } from 'Transformer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withRouter from 'react-router-dom/withRouter';
import { Link } from 'react-router-dom';
import { addSong } from 'Redux/api/currentStation/actions';
import Grid from 'material-ui/Grid';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';
import AddIcon from 'react-icons/lib/md/add-to-queue';
import { withNotification } from 'Component/Notification';
import { Images } from 'Theme';
import styles from './styles';

/* eslint-disable no-shadow */
/* eslint-disable camelcase */
class FavouriteVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      replay: false,
      isFavourite: false,
    };

    this._onReplayClick = this._onReplayClick.bind(this);
  }

  _onReplayClick() {
    const {
      notification,
      addSong,
      match: { params: { stationId } },
      user: { userId, username, name, avatar_url },
      url,
      title,
      thumbnail,
    } = this.props;

    // Check if user is not authenticated
    if (!userId) {
      notification.app.warning({
        message: 'You need to login to use this feature.',
      });
      return;
    }

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
    const { thumbnail, title, creator, duration, classes } = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid item xs={3} className={classes.thumbnail}>
          <img className={classes.img} src={thumbnail} />
          <div className={classes.duration}>
            <span className={classes.durationText}>
              {transformNumber.millisecondsToTime(duration)}
            </span>
          </div>
        </Grid>
        <Grid item xs={8} className={classes.info}>
          <Tooltip placement={'bottom'} title={title}>
            <div className={classes.name}>{title}</div>
          </Tooltip>
          {/* <Tooltip */}
          {/* placement={'bottom'} */}
          {/* title={ */}
          {/* this.state.isFavourite */}
          {/* ? 'Remove from favourite' */}
          {/* : 'Add to favourite' */}
          {/* } */}
          {/* > */}
          {/* <div */}
          {/* className={classNames(classes.favouriteWrapper, 'hiddenAction')} */}
          {/* > */}
          {/* <IconButton color={'primary'} className={classes.favouriteBtn}> */}
          {/* {this.state.isFavourite ? <StarIcon /> : <OutlineStarIcon />} */}
          {/* </IconButton> */}
          {/* </div> */}
          {/* </Tooltip> */}
          <div className={classes.creator}>
            Added by
            {creator === null || creator === undefined ? (
              ' Unregistered User'
            ) : (
              <Tooltip placement={'bottom'} title={creator.name}>
                <Link to={`/profile/${creator.username}`}>
                  <img
                    src={creator.avatar_url || Images.avatar.male01}
                    className={classes.creatorAvatar}
                  />
                </Link>
              </Tooltip>
            )}
          </div>
        </Grid>
        <Grid item xs={1} className={classes.actions}>
          <Tooltip
            placement={'bottom'}
            title={`Add this song to current playlist`}
          >
            <IconButton
              className={classes.action}
              color="default"
              onClick={this._onReplayClick}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    );
  }
}

FavouriteVideo.propTypes = {
  classes: PropTypes.any,
  url: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.any,
  duration: PropTypes.number,
  creator: PropTypes.object,
  addSong: PropTypes.func,
  match: PropTypes.any,
  user: PropTypes.object,
  replayRequest: PropTypes.func,
  notification: PropTypes.object,
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
  withNotification,
)(FavouriteVideo);
