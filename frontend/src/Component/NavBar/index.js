import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';

import { withStyles } from 'material-ui/styles';
import fixture from '../../Fixture/landing';
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
  login: {
    title: 'Login',
    url: '/auth/login',
  },
};

class NavBar extends Component {
  render() {
    const { classes } = this.props;
    const menusLength = Object.keys(MENUS).length;
    return (
      <Grid container justify="center" className={classes.container}>
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.wrapper}
        >
          <Grid item xs={4}>
            <Grid container className={classes.logo}>
              <Grid item xs={0}>
                <img
                  src={fixture.logo}
                  alt="Team Radio"
                  className={classes.img}
                />
              </Grid>
              <Hidden smDown>
                <Link to={'/'} className={classes.logoName}>
                  {fixture.name}
                </Link>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container className={classes.navContainer}>
              <Grid item className={classes.navWrapper}>
                {Object.keys(MENUS).map((key, index) => {
                  const { title } = MENUS[key];
                  return (
                    <Link key={index} to={MENUS[key].url}>
                      {index === menusLength - 1 ? title : `${title} - `}
                    </Link>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.any,
  style: PropTypes.any,
};

export default withStyles(styles)(NavBar);
