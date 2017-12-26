import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';

import { withStyles } from 'material-ui/styles';
import fixture from '../../../Fixture/landing';
import styles from './styles';

class SectionContent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" className={classes.container}>
        <Grid container className={classes.wrapper}>
          <Hidden mdDown>
            <Grid item xs={12} sm={12} lg={6} className={classes.imageBlock}>
              <img
                src={fixture.section.content1.windows}
                alt={fixture.section.content1.alt}
                style={{ width: '100%' }}
              />
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={12} lg={6} className={classes.textBlock}>
            <div className={classes.textContent}>
              <h3 className={classes.textTitle}>
                {fixture.section.content1.title}
              </h3>
              <p className={classes.textDescription}>
                {fixture.section.content1.description}
              </p>
              <a className={classes.button}>
                {fixture.section.content1.linkTitle}
              </a>
            </div>
          </Grid>
          <Hidden lgUp>
            <Grid item xs={12} sm={12} lg={6} className={classes.imageBlock}>
              <img
                src={fixture.section.content1.windows}
                alt={fixture.section.content1.alt}
                style={{ width: '100%' }}
              />
            </Grid>
          </Hidden>
        </Grid>
        <Grid container className={classes.wrapper}>
          <Grid item xs={12} sm={12} lg={6} className={classes.textBlock}>
            <div className={classes.textContent}>
              <h3 className={classes.textTitle}>
                {fixture.section.content2.title}
              </h3>
              <p className={classes.textDescription}>
                {fixture.section.content2.description}
              </p>
              <a className={classes.button}>Explore music together</a>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} className={classes.imageBlock}>
            <img
              src={fixture.section.content2.windows}
              alt={fixture.section.content2.alt}
              style={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

SectionContent.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(SectionContent);
