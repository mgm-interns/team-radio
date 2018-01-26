import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import CameraIcon from 'react-icons/lib/md/camera-alt';

import { withNotification } from 'Component/Notification';
import { UserAvatar, CoverPhoto } from 'Component';
import styles from './styles';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultCover:
        'https://static.flii.by/thumbs/user/ramas_cover_1280x850.jpg',
    };

    this._renderHeader = this._renderHeader.bind(this);
    this._renderSummarizeItem = this._renderSummarizeItem.bind(this);
  }

  static _renderLoading() {
    return <CircularProgress />;
  }

  _renderSummarizeItem(text, number = 0) {
    const { classes } = this.props;
    return (
      <div className={classes.summarizeItem}>
        <Typography type="subheading" className={classes.text}>
          {text}
        </Typography>
        <Typography type="body2" className={classes.number}>
          {number}
        </Typography>
      </div>
    );
  }

  _renderHeader() {
    const { classes, user, isDisabled } = this.props;

    return (
      <Grid container className={classes.coverBackground}>
        <Grid item xs={12} sm={8} className={classes.userInformationContainer}>
          <Grid className={classes.userInformation}>
            <UserAvatar user={user} isDisabled={isDisabled} />

            <div className={classes.userInformationContent}>
              <Typography type="headline" className={classes.text}>
                {user.name}
              </Typography>
              <Typography className={classes.text}>@{user.username}</Typography>
            </div>
          </Grid>

          <Grid className={classes.summarize}>
            {this._renderSummarizeItem('Songs', 0)}
            {this._renderSummarizeItem('Voted', 0)}
            {this._renderSummarizeItem('Reputation', user.reputation)}
          </Grid>
        </Grid>

        {isDisabled && (
          <Grid
            item
            xs={12}
            sm={4}
            className={classes.changeCoverActionWrapper}
          >
            <CoverPhoto user={user} />
          </Grid>
        )}
      </Grid>
    );
  }

  render() {
    const { classes, loading } = this.props;

    if (loading) {
      return this._renderLoading();
    }

    return (
      <Grid container className={classes.coverContainer}>
        <Grid container className={classes.coverWrapper}>
          {this._renderHeader()}
        </Grid>

        <div>
          <img
            src={this.props.user.cover_url || this.state.defaultCover}
            className={classes.backgroundImg}
          />
        </div>
      </Grid>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.any,
  loading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

Header.defaultProps = {
  user: {},
  loading: false,
};

export default compose(withStyles(styles), withNotification)(Header);
