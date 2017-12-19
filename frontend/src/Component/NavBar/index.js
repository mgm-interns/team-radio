import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';

import { withStyles } from 'material-ui/styles';
import fixture from '../../Fixture/landing';
import styles from './styles';

class NavBar extends Component {
  render() {
    const { classes } = this.props;
    // console.log(palette.primary['500']);
    return (
      <Grid container xs={12} className={classes.container}>
        <Grid container xs={3}>
          <Grid container className={classes.logo}>
            <Grid xs={0}>
              <img
                item
                src={fixture.logo}
                alt="Team Radio"
                className={classes.img}
              />
            </Grid>
            <Hidden xsDown>
              <Grid item xs={8} className={[classes.logoName, classes.text]}>
                {fixture.name}
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid container xs={7} className={classes.navigationContainer}>
          <Grid container xs className={classes.wrapper}>
            <Link to="/" className={classes.text}>
              HOME
            </Link>
            <Link to="/station" className={classes.text}>
              STATIONS
            </Link>
            <Link to="/auth/login" className={classes.text}>
              LOGIN
            </Link>
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
