import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import withRouter from 'react-router-dom/withRouter';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import { NavBar, Footer } from 'Component';
import { logout, fetchUserWithUsername } from 'Redux/api/user/actions';

import Header from './Header';
import Body from './Body';
import styles from './styles';

/* eslint-disable no-shadow */
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isOwner: false,
    };

    this._renderLoading = this._renderLoading.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading === false) {
      const { match: { params: { username } }, history } = this.props;
      if (username !== nextProps.user.username) {
        // Go to landing page
        // console.log('redirect landing');
        // history.push('/');
      }
    }
  }

  _renderLoading() {
    return <CircularProgress />;
  }

  render() {
    const { classes, user } = this.props;

    if (!user) {
      this._renderLoading();
    }
    return [
      <NavBar key={1} color="primary" />,
      <Grid
        key={2}
        direction="row"
        container
        className={classes.containerWrapper}
      >
        <Header user={user} />
        <Body user={user} />
      </Grid>,
      <Footer key={3} />,
    ];
  }
}

Profile.propTypes = {
  classes: PropTypes.any,
  fetchUserWithUsername: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: state.api.user.data,
  loading: state.api.user.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchUserWithUsername: username => dispatch(fetchUserWithUsername(username)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Profile);
