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
    title: 'home',
    url: '/',
  },
  stations: {
    title: 'my station',
    url: '/station',
  },
  login: {
    title: 'login',
    url: '/auth/login',
  },
};

class NavBar extends Component {
  render() {
    const { classes } = this.props;
    const menusLength = Object.keys(MENUS).length;
    return (
      <Grid container xs={12} lg={12} className={classes.container}>
        <Grid container xs={3} lg={3}>
          <Grid container className={classes.logo}>
            <Grid item xs={0}>
              <img
                item
                src={fixture.logo}
                alt="Team Radio"
                className={classes.img}
              />
            </Grid>
            <Hidden xsDown>
              <Grid item xs={8} className={classes.logoName}>
                {fixture.name}
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid container xs={7} className={classes.navigationContainer}>
          <Grid item className={classes.wrapper}>
            {Object.keys(MENUS).map((key, index) => {
              const title = MENUS[key].title.toUpperCase();
              return (
                <Link key={index} to={MENUS[key].url} className={classes.text}>
                  {index === menusLength - 1 ? title : `${title} - `}
                </Link>
              );
            })}
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
