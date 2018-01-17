import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import withRouter from 'react-router-dom/withRouter';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import { NavBar, Footer } from 'Component';
import { getUserByUsername } from 'Redux/api/userProfile/actions';

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
    const { classes, user, isOwner } = this.props;

    if (!user) {
      return this._renderLoading();
    }

    return [
      <NavBar key={1} color="primary" />,
      <Grid
        key={2}
        direction="row"
        container
        className={classes.containerWrapper}
      >
        <Header user={user} isDisabled={isOwner} />
        <Body user={user} isDisabled={isOwner} />
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
  loading: PropTypes.bool,
  isOwner: PropTypes.bool,
  requestUserByUsername: PropTypes.func,
};

const mapStateToProps = ({ api }) => ({
  user: api.userProfile.data,
  isOwner: api.userProfile.data.isOwner,
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
