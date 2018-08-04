import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import CloseIcon from 'react-icons/lib/md/close';
import MaximizeIcon from 'react-icons/lib/md/crop-square';
import { compose } from 'redux';
import { getElectronInstance, isElectronInstance } from 'Util/electron';
import styles from './styles';

const { remote } = getElectronInstance();

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.handleMinimizeButton = this.handleMinimizeButton.bind(this);
    this.handleMaximizeButton = this.handleMaximizeButton.bind(this);
    this.handleCloseButton = this.handleCloseButton.bind(this);
  }

  handleMinimizeButton(event) {
    event.preventDefault();
    remote.getCurrentWindow().minimize();
  }

  handleMaximizeButton(event) {
    event.preventDefault();
    const currentWindow = remote.getCurrentWindow();
    return currentWindow.isMaximized()
      ? currentWindow.unmaximize()
      : currentWindow.maximize();
  }

  handleCloseButton(event) {
    event.preventDefault();
    remote.getCurrentWindow().close();
  }

  render() {
    const { classes } = this.props;

    if (!isElectronInstance()) return null;

    return (
      <AppBar
        className={classes.container}
        onDoubleClick={this.handleMaximizeButton}
      >
        <Toolbar className={classes.toolbar}>
          <Grid container className={classes.content}>
            <Grid item xs={12}>
              <Grid container justify="space-between">
                <div className={classes.rightContainer}>
                  <IconButton
                    className={classes.actionButton}
                    color="inherit"
                    onClick={this.handleMinimizeButton}
                  >
                    <div className={classes.hideIcon}>_</div>
                  </IconButton>
                  <IconButton
                    className={classes.actionButton}
                    color="inherit"
                    onClick={this.handleMaximizeButton}
                  >
                    <MaximizeIcon />
                  </IconButton>
                  <IconButton
                    className={classes.actionButton}
                    color="inherit"
                    onClick={this.handleCloseButton}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

MenuBar.propTypes = {
  classes: PropTypes.any,
};

export default compose(withStyles(styles))(MenuBar);
