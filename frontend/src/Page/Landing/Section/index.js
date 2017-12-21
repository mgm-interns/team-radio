import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
import Images from '../../../Theme/Images';
// import fixture from '../../../Fixture/landing';
import styles from './styles';

class Section extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.sectionContainer}>
        <Grid>
          <img
            src={Images.drummer}
            alt="Team Radio"
            className={classes.sectionImages}
          />
        </Grid>
        <Grid item xs={12} lg={12} className={classes.sectionDescription}>
          <Grid>
            <span className={classes.sectionTitle}>WHERE MUSIC HAPPENS</span>
            <br />
            <span className={classes.sectionSubtitle}>
              When you needs to share music and your whole team can hear it!
            </span>
          </Grid>
        </Grid>
        <Grid item xs={8} sm lg={6} />
        <Grid item xs lg className={classes.sectionContentContainer}>
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

Section.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(Section);
