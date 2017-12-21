import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

import { withStyles } from 'material-ui/styles';
import fixture from '../../../Fixture/landing';
import styles from './styles';

class Backdrop extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container xs={12} className={classes.backdropContainer}>
        <Grid container className={classes.backdropForeground}>
          <Grid lg={12} className={classes.backdropSloganContainer}>
            <span className={classes.backdropSlogan}>{fixture.slogan}</span>
          </Grid>
          <Grid item xs lg={12} className={classes.formInput}>
            <TextField
              label="Name your station"
              placeholder="Name your station"
              margin="normal"
              autoFocus={true}
              className={classes.textField}
            />
            <Button raised color="primary" className={classes.buttonNew}>
              NEW <Icon className={classes.sendIcon}>send</Icon>
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.backdropImg}>
            <img
              src="https://avante.biz/wp-content/uploads/Music-Wallpaper/Music-Wallpaper-001.jpg"
              alt="Team Radio - Cover"
              className={classes.backdropImg}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Backdrop.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(Backdrop);
