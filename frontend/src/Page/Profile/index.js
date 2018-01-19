import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import { NavBar, Footer } from 'Component';
import { getUserByUsername } from 'Redux/api/userProfile/';
import { withNotification } from 'Component/Notification';
import sleep from 'Util/sleep';

import Header from './Header';
import Body from './Body';
import styles from './styles';

/* eslint-disable no-shadow */
class Profile extends Component {
  constructor(props) {
    super(props);

    this._showNotification = this._showNotification.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.getUserByUsername(params.username);
  }

  async componentWillReceiveProps(nextProps) {
    const { userProfile, match: { params } } = nextProps;

    if (params.username !== this.props.match.params.username) {
      await this.props.getUserByUsername(params.username);
    }

    const currentUser = this.props.userProfile;
    const increaseNumber = Profile._calculateIncreaseReputation(
      currentUser.reputation,
      userProfile.reputation,
    );

    if (userProfile.message !== currentUser.message && userProfile.message) {
      this._showNotification(userProfile.message);

      if (userProfile.message === 'User not found!') {
        this.props.history.replace('/');
      }
    }

    // show notification when user upload avatar on the first time
    if (
      currentUser.username === userProfile.username &&
      currentUser.avatar_url !== userProfile.avatar_url &&
      currentUser.avatar_url === null &&
      increaseNumber !== 0
    ) {
      await sleep(1000);
      this._showNotification(
        `Congratulations! You just got ${increaseNumber} for a gift!`,
      );
    }
  }

  static _renderLoading() {
    return <CircularProgress />;
  }

  static _calculateIncreaseReputation(oldNumber, newNumber) {
    return newNumber - oldNumber;
  }

  _showNotification(content) {
    const { notification } = this.props;

    notification.app.success({
      message: content,
    });
  }

  render() {
    const { classes, userProfile, isOwner, loading } = this.props;
    let content = null;

    if (loading) {
      content = <CircularProgress />;
    } else {
      content = (
        <Grid
          key={2}
          direction="row"
          container
          className={classes.containerWrapper}
        >
          <Header user={userProfile} isDisabled={isOwner} />
          <Body user={userProfile} isDisabled={isOwner} />
        </Grid>
      );
    }

    return (
      <Fragment>
        <NavBar key={1} color="primary" />
        {content}
        <Footer key={3} />
      </Fragment>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.object,
  userProfile: PropTypes.object,
  loading: PropTypes.bool,
  isOwner: PropTypes.bool,
  getUserByUsername: PropTypes.func,
  notification: PropTypes.object,
  match: PropTypes.any,
  history: PropTypes.any,
};

const mapStateToProps = ({ api }) => ({
  user: api.user.data,
  userProfile: api.userProfile.user.data,
  isOwner: api.userProfile.user.data.isOwner,
  loading: api.userProfile.user.data.loading,
});

const mapDispatchToProps = dispatch => ({
  getUserByUsername: username => dispatch(getUserByUsername(username)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withNotification,
  withRouter,
)(Profile);
