import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import ImageCropper from './ImageCropper';
import LoginSocial from './LoginSocial';
import Notification from './Notification';
import ImageUploader from './ImageUploader';
import { NavBar } from 'Component';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    // marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
    paddingTop: '80px',
  },
});

class DemoPage extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes } = this.props;
    return (
      <div style={{ justifyContent: 'center' }}>
        <NavBar color="primary" />
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs value={this.state.value} onChange={this.handleChange}>
              <Tab label="Image Uploader" />
              <Tab label="Image Cropper" />
              <Tab label="Login Social" />
              <Tab label="Notifcation" />
            </Tabs>
          </AppBar>
          {this.state.value === 0 && (
            <TabContainer>
              <ImageUploader />
            </TabContainer>
          )}
          {this.state.value === 1 && (
            <TabContainer>
              <ImageCropper />
            </TabContainer>
          )}
          {this.state.value === 2 && (
            <TabContainer>
              <LoginSocial />
            </TabContainer>
          )}
          {this.state.value === 3 && (
            <TabContainer>
              <Notification />
            </TabContainer>
          )}
        </div>
      </div>
    );
  }
}

DemoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DemoPage);
