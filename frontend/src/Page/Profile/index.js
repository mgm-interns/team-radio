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
    const { userProfile, match: { params }, user } = nextProps;

    // fetch user profile from react router
    if (params.username !== this.props.match.params.username) {
      await this.props.getUserByUsername(params.username);
    }

    // get message for user activities
    if (
      this.props.user.message !== nextProps.user.message &&
      nextProps.user.message
    ) {
      this._showNotification(user.message);
      // fetch again when user change information
      this.props.getUserByUsername(nextProps.user.username);
    }

    // check user is available and redirect to homepage
    if (
      nextProps.userProfile.message !== this.props.userProfile.message &&
      nextProps.userProfile.message
    ) {
      if (userProfile.message === 'User not found!') {
        this.props.history.replace('/');
      }
    }

    const increaseNumber = Profile._calculateIncreaseReputation(
      nextProps.user.reputation,
      this.props.user.reputation,
    );

    // show notification when user upload avatar on the first time
    // if (increaseNumber > 0) {
    //   // await sleep(1000);
    //   this._showNotification(
    //     `Congratulations! You just got ${increaseNumber || 0} for a gift!`,
    //   );
    // }
  }

  static _renderLoading() {
    return <CircularProgress />;
  }

  static _calculateIncreaseReputation(oldNumber, newNumber = 0) {
    return newNumber - oldNumber || 0;
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

    if (Array.isArray(userProfile)) {
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
          <Body userProfile={userProfile} isDisabled={isOwner} />
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
  userProfile: PropTypes.any,
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
