import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { withStyles } from 'material-ui/styles';
import fixture from '../../../Fixture/landing';
import styles from './styles';

class Backdrop extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container xs={12} className={classes.backdropContainer}>
        <Grid container className={classes.backdropForeground}>
          <h3 className={classes.backdropSlogan}>{fixture.slogan}</h3>
          <Grid item xs className={classes.formInput}>
            <TextField
              label="Name your station"
              placeholder="Name your station"
              margin="normal"
              autoFocus={true}
            />
            <Button raised color="primary">
              CREATE
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

export default withStyles(styles)(Backdrop);
