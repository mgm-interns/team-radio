import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

class WavingAnimation extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }
}

WavingAnimation.propTypes = {};
WavingAnimation.defaultProps = {};

export default withStyles(styles)(WavingAnimation);
