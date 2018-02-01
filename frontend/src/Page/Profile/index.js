import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';

import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import { NavBar, Footer } from 'Component';
import { getVisitorByUsername } from 'Redux/api/visitor';

import tokenInjector from 'Util/redux/tokenInjector';
import { withNotification } from 'Component/Notification';

import Header from './Header';
import Body from './Body';
import styles from './styles';

/* eslint-disable no-shadow */
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reputation: 0,
    };

    this._showNotification = this._showNotification.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.getVisitorByUsername(params.username);
  }

  componentWillReceiveProps(nextProps) {
    const { visitor, match: { params }, user, isOwner } = nextProps;
    const authenticatedUser = this.props.user;
    const visitedUser = this.props.visitor;

    // fetch user profile from react router
    if (params.username !== this.props.match.params.username) {
      this.props.getVisitorByUsername(params.username);
    }

    // save reputation to check when something changes
    if (isOwner) {
      this.setState({
        reputation: user.reputation,
      });
    }

    // get message for user activities
    if (authenticatedUser.message !== user.message && user.message) {
      this._showNotification(user.message);

      const increaseReputation = Profile._calculateIncreaseReputation(
        this.state.reputation, // current reputation
        user.reputation, // new reputation
      );

      // show notification when user upload avatar on the first time
      if (increaseReputation > 0) {
        // await sleep(1000);
        this._showNotification(
          `Congratulations! You just got ${increaseReputation ||
            0} for a gift!`,
        );
      }

      // fetch again when user change information
      // this.props.getVisitorByUsername(user.username);
    }

    // check user is available and redirect to homepage
    if (visitor.message !== visitedUser.message && visitor.message) {
      if (visitor.message === 'User not found!') {
        this.props.history.replace('/');
      }
    }
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
    const { classes, visitor, user, isOwner } = this.props;
    let content = null;

    if (Array.isArray(visitor)) {
      content = Profile._renderLoading();
    } else {
      const data = isOwner ? user : visitor;

      content = (
        <Grid direction="row" container className={classes.containerWrapper}>
          <Header user={data} isDisabled={isOwner} />{' '}
          <Body
            userId={data.userId}
            name={data.name || data.username}
            isDisabled={isOwner}
          />{' '}
        </Grid>
      );
    }

    return (
      <Fragment>
        <NavBar key={1} color="primary" /> {content} <Footer key={3} />{' '}
      </Fragment>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.object,
  visitor: PropTypes.any,
  loading: PropTypes.bool,
  isOwner: PropTypes.bool,
  getVisitorByUsername: PropTypes.func,
  notification: PropTypes.object,
  match: PropTypes.any,
  history: PropTypes.object,
};

const mapStateToProps = ({ api }) => ({
  user: api.user.data,
  visitor: api.visitor.visitor.data,
  isOwner: api.visitor.visitor.data.isOwner,
});

const mapDispatchToProps = dispatch => ({
  getVisitorByUsername: username =>
    dispatch(tokenInjector(getVisitorByUsername(username))),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withNotification,
  withRouter,
)(Profile);
