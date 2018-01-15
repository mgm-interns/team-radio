import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import withRouter from 'react-router-dom/withRouter';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import { NavBar, Footer } from 'Component';
import { getUserByUsername } from 'Redux/api/user/profile';

import Header from './Header';
import Body from './Body';
import styles from './styles';

/* eslint-disable no-shadow */
class Profile extends Component {
  constructor(props) {
    super(props);

    this._renderLoading = this._renderLoading.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.requestUserByUsername(params.username);
  }

  _renderLoading() {
    return <CircularProgress />;
  }

  render() {
    const { classes, userProfile } = this.props;

    return [
      <NavBar key={1} color="primary" />,
      <Grid
        key={2}
        direction="row"
        container
        className={classes.containerWrapper}
      >
        <Header
          user={userProfile.data.user}
          loading={userProfile.loading}
          isDisabled={userProfile.data.isOwner}
        />
        <Body
          user={userProfile.data.user}
          loading={userProfile.loading}
          isDisabled={userProfile.data.isOwner}
        />
      </Grid>,
      <Footer key={3} />,
    ];
  }
}

Profile.propTypes = {
  classes: PropTypes.any,
  fetchUserWithUsername: PropTypes.func,
  user: PropTypes.object,
  userProfile: PropTypes.object,
};

const mapStateToProps = ({ api }) => ({
  user: api.user.data,
  userProfile: api.userProfile.user,
  loading: api.user.loading,
});

const mapDispatchToProps = dispatch => ({
  requestUserByUsername: username => dispatch(getUserByUsername(username)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Profile);
