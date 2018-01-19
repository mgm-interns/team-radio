import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
import fixture from '../../../Fixture/landing';
import styles from './styles';

const Cover = ({ classes }) => (
  <Grid container justify="center" className={classes.container}>
    <Grid container className={classes.wrapper}>
      <Grid item xs sm={12} lg={6} className={classes.textBlock}>
        <div className={classes.textContent}>
          <h3 className={classes.textTitle}>{fixture.section.cover.title}</h3>
          <p className={classes.textDescription}>
            {fixture.section.cover.description}
          </p>
          <a
            className={classes.button}
            onClick={() =>
              window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
              })
            }
          >
            {fixture.section.cover.buttonText}
          </a>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} lg={6} className={classes.imageBlock}>
        <img
          src={fixture.section.cover.windows}
          alt={fixture.section.cover.alt}
          style={{ width: '100%' }}
        />
      </Grid>
    </Grid>
  </Grid>
);

Cover.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(Cover);
