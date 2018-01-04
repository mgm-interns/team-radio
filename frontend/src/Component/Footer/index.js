import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
// import Images from 'Theme/Images';
// import fixture from 'Fixture/landing';
import styles from './styles';

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid item xs className={classes.wrapper}>
          <Grid item xs={12} className={classes.copyright}>
            <span className={classes.copyrightText}>
              Copyright 2017 &copy; MGM Internship 2017. All rights reversed
            </span>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(Footer);
