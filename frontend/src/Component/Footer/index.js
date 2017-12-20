import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
// import Images from '../../../Theme/Images';
// import fixture from '../../../Fixture/landing';
import styles from './styles';

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return <Grid container xs={12} className={classes.footerContainer} />;
  }
}

export default withStyles(styles)(Footer);
