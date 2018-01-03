import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
import fixture from 'Fixture/landing';
import { loadAuthenticationState, removeAuthenticationState } from 'Config';
import { logout } from 'Redux/api/user/actions';
import { connect } from 'react-redux';
import { GoogleLogout } from 'Component';

import styles from './styles';

const MENUS = {
  home: {
    title: 'Home',
    url: '/',
  },
  stations: {
    title: 'My Station',
    url: '/station',
  },
  // login: {
  //   title: 'Login',
  //   url: '/auth/login',
  // },
};

// const function isLogin(params) {
//   ret
// }

// const defaultColor = 'rgba(10, 55, 58, 0.4) !important';

const setColor = {
  default: 'rgba(10, 55, 58, 0.4) !important',
  primary: '#e06a4e',
};

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transform: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const element = event.target || event.srcElement;
    const { scrollTop } = element.documentElement;
    this.setState({
      transform: scrollTop,
    });
  }

  render() {
    const { classes, color, dispatch } = this.props;

    return (
      <Grid
        container
        justify="center"
        className={classes.container}
        style={
          color === undefined && this.state.transform !== 0
            ? { filter: 'opacity(0.8)', backgroundColor: setColor.primary }
            : { backgroundColor: setColor[color] }
        }
      >
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.wrapper}
        >
          <Grid item xs={4}>
            <Grid container className={classes.logo}>
              <Grid item xs>
                <Link to="/">
                  <img
                    src={fixture.logo}
                    alt="Team Radio"
                    className={classes.img}
                  />
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container className={classes.navContainer}>
              <Grid item className={classes.navWrapper}>
                {Object.keys(MENUS).map((key, index) => {
                  const { title } = MENUS[key];
                  return (
                    <Link key={index} to={MENUS[key].url}>
                      {/* {index === menusLength - 1 ? title : `${title} - `} */}
                      {`${title} - `}
                    </Link>
                  );
                })}

                <AuthLink dispatch={dispatch} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

class AuthLink extends Component {
  _logout() {
    // localStorage.removeItem('token');
    removeAuthenticationState();
    this.props.dispatch(logout());
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        {!loadAuthenticationState() && (
          <React.Fragment>
            <Link to="/auth/login">Login - </Link>
            <Link to="/auth/register">Register</Link>
          </React.Fragment>
        )}
        {loadAuthenticationState() && (
          <a onClick={this._logout.bind(this)}>Logout</a>
        )}
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.any,
  style: PropTypes.any,
  color: PropTypes.string,
};

AuthLink.propTypes = {
  dispatch: PropTypes.any,
};

export default connect(null, null)(withStyles(styles)(NavBar));
