import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
import Images from 'Theme/Images';
// import fixture from 'Fixture/landing';
import styles from './styles';

class Section extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container alignItems="center" className={classes.sectionContainer}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <img
            src={Images.drummer}
            alt="Team Radio"
            className={classes.sectionImages}
          />
        </Grid>
        <Grid item xs={12} sm className={classes.sectionDescription}>
          <div>
            <span className={classes.sectionTitle}>WHERE MUSIC HAPPENS</span>
            <br />
            <span className={classes.sectionSubtitle}>
              When you needs to share music and your whole team can hear it!
            </span>
          </div>
          <div className={classes.sectionContentContainer}>
            <span className={classes.sectionContent}>
              {`Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not
        only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged.`}
            </span>
          </div>
        </Grid>
      </Grid>
    );
  }
}

Section.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(Section);
