import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
import Images from '../../../Theme/Images';
// import fixture from '../../../Fixture/landing';
import styles from './styles';

class Section extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container xs={12} className={classes.sectionContainer}>
        <Grid item xs={12} className={classes.sectionDescription}>
          <h3 className={classes.sectionTitle}>Where music happens</h3>
          <span className={classes.sectionSubtitle}>
            When you needs to share music and your whole team can hear it!
          </span>
          <br />
        </Grid>
        <Grid item xs={11}>
          <img
            src={Images.drummer}
            alt="Team Radio"
            className={classes.sectionImages}
          />
        </Grid>
        <Grid item xs={12}>
          <span className={classes.sectionContent}>
            {`Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not
        only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged.`}
          </span>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Section);
