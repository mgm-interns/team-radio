import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
import Images from '../../../Theme/Images';
// import fixture from '../../../Fixture/landing';
import styles from './styles';

class SectionCover extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" className={classes.container}>
        <Grid container className={classes.wrapper}>
          <Grid item xs sm={12} lg={6} className={classes.textBlock}>
            <div className={classes.textContent}>
              <h3 className={classes.textTitle}>Create your own</h3>
              <p
                className={classes.textDescription}
              >{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}</p>
              <a className={classes.button}>Try it now</a>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} className={classes.imageBlock}>
            <img
              src={Images.windows.stations}
              alt=""
              style={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

SectionCover.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(SectionCover);
