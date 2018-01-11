import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import styles from './styles';

const TabContainer = ({ classes, children }) => (
  <Typography component="div" className={classes.container}>
    {children}
  </Typography>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object,
};

export default withStyles(styles)(TabContainer);
