import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import { withNotification } from 'Component';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

class NotificationDemo extends Component {
  constructor(props) {
    super(props);
    this.callAppNotification = this.callAppNotification.bind(this);
    this.callBrowserNotification = this.callBrowserNotification.bind(this);
    this.callBothNotification = this.callBothNotification.bind(this);
  }
  async callAppNotification() {
    const { notification: { app, browser } } = this.props;
    let count = 0;
    const duration = 2000;
    // // Call notification 3 times
    const interval = setInterval(async () => {
      await app.success({
        message: 'Hello, this is app notification!',
        duration,
      });
      count += 1;
      if (count > 3) {
        clearInterval(interval);
      }
    }, 300);
  }

  async callBrowserNotification() {
    const { notification: { app, browser } } = this.props;
    let count = 0;
    const duration = 2000;
    // // Call notification 3 times
    const interval = setInterval(async () => {
      await browser.info({
        message: 'Hello, this is browser notification',
        duration,
      });
      count += 1;
      if (count > 3) {
        clearInterval(interval);
      }
    }, 300);
  }

  async callBothNotification() {
    const { notification: { app, browser } } = this.props;
    let count = 0;
    const duration = 2000;
    // // Call notification 3 times
    const interval = setInterval(async () => {
      await app.success({
        message: 'Hello, this is app notification!',
        duration,
      });
      await browser.info({
        message: 'Hello, this is browser notification',
        duration,
      });
      count += 1;
      if (count > 3) {
        clearInterval(interval);
      }
    }, 300);
  }

  render() {
    return (
      <Grid container style={{ margin: 0, width: '100%' }}>
        <Grid item xs={12}>
          <h1>Notification Demo</h1>
        </Grid>
        <Grid item xs={12}>
          <Button raised color="primary" onClick={this.callAppNotification}>
            <span>App Notification</span>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button raised color="primary" onClick={this.callBrowserNotification}>
            <span>Browser Notification</span>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button raised color="primary" onClick={this.callBothNotification}>
            <span>Both Notification</span>
          </Button>
        </Grid>
      </Grid>
    );
  }
}

NotificationDemo.propTypes = {
  notification: PropTypes.object,
};

export default compose(withNotification)(NotificationDemo);
