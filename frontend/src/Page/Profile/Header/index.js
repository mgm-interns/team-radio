import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import IconButton from 'material-ui/IconButton';
import CameraIcon from 'react-icons/lib/md/camera-alt';

import { withNotification } from 'Component/Notification';
import ImageUploader from 'Component/ImageUploader';
import styles from './styles';

class Header extends Component {
  constructor(props) {
    super(props);

    this._onChangeCoverClick = this._onChangeCoverClick.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderSummarizeItem = this._renderSummarizeItem.bind(this);
  }

  _onChangeCoverClick() {
    this.props.notification.app.warning({
      message: 'This feature is not ready yet.',
    });
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
        <Grid item xs={12} sm={6} className={classes.userInformationContainer}>
          <div className={classes.userInformation}>
            <ImageUploader user={user} isDisabled={isDisabled} />

            <div className={classes.userInformationContent}>
              <Typography type="headline" className={classes.text}>
                {user.name}
              </Typography>
              <Typography className={classes.text}>@{user.username}</Typography>
            </div>
          </div>

          <div className={classes.summarize}>
            {this._renderSummarizeItem('Songs', 0)}
            {this._renderSummarizeItem('Voted', 0)}
            {this._renderSummarizeItem('Reputation', user.reputation)}
          </div>
        </Grid>

        <Grid item xs={12} sm={6} className={classes.changeCoverActionWrapper}>
          {isDisabled && (
            <Button
              raised
              className={classes.icon}
              onClick={this._onChangeCoverClick}
            >
              <CameraIcon />
              <span style={{ paddingLeft: 8, textTransform: 'none' }}>
                {'Update cover photo'}
              </span>
            </Button>
          )}
        </Grid>
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

        <img
          src="https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/19961481_1013554005414569_5638203489008040664_n.jpg?oh=f8661d1bfd22763de4f9bcdf01187c06&oe=5AF8C6F9"
          className={classes.backgroundImg}
        />
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
