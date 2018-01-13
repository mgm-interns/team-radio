import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import { NavBar } from 'Component';
import ImageCropper from './ImageCropper';
import LoginSocial from './LoginSocial';
import Notification from './Notification';

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
    paddingTop: 60,
  },
});

class DemoPage extends Component {
  state = {
    value: 2,
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
              <Tab label="Image Cropper" />
              <Tab label="Login Social" />
              <Tab label="Notification" />
            </Tabs>
          </AppBar>
          {this.state.value === 0 && (
            <TabContainer>
              <ImageCropper />
            </TabContainer>
          )}
          {this.state.value === 1 && (
            <TabContainer>
              <LoginSocial />
            </TabContainer>
          )}
          {this.state.value === 2 && (
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
