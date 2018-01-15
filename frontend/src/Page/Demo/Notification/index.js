import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withNotification } from 'Component/Notification';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

class NotificationDemo extends Component {
  constructor(props) {
    super(props);
    this.callAppNotification = this.callAppNotification.bind(this);
    this.callAppNotificationSuccess = this.callAppNotificationSuccess.bind(
      this,
    );
    this.callAppNotificationInfo = this.callAppNotificationInfo.bind(this);
    this.callAppNotificationWarning = this.callAppNotificationWarning.bind(
      this,
    );
    this.callAppNotificationError = this.callAppNotificationError.bind(this);
    this.callBrowserNotification = this.callBrowserNotification.bind(this);
    this.callBothNotification = this.callBothNotification.bind(this);
  }

  async callAppNotificationSuccess() {
    const { notification: { app } } = this.props;
    // let count = 0;
    const duration = 2000;
    // // Call notification 3 times
    const interval = setInterval(async () => {
      await app.success({
        message: 'Hello, this is app notification!',
        duration,
      });
      clearInterval(interval);
    }, 300);
  }

  async callAppNotificationInfo() {
    const { notification: { app } } = this.props;
    // let count = 0;
    const duration = 2000;
    // // Call notification 3 times
    const interval = setInterval(async () => {
      await app.info({
        message: 'Hello, this is app notification!',
        duration,
      });
      clearInterval(interval);
    }, 300);
  }

  async callAppNotificationWarning() {
    const { notification: { app } } = this.props;
    // let count = 0;
    const duration = 2000;
    // // Call notification 3 times
    const interval = setInterval(async () => {
      await app.warning({
        message: 'Hello, this is app notification!',
        duration,
      });
      clearInterval(interval);
    }, 300);
  }

  async callAppNotificationError() {
    const { notification: { app } } = this.props;
    // let count = 0;
    const duration = 2000;
    // // Call notification 3 times
    const interval = setInterval(async () => {
      await app.error({
        message: 'Hello, this is app notification!',
        duration,
      });
      clearInterval(interval);
    }, 300);
  }

  async callAppNotification() {
    const { notification: { app } } = this.props;
    // let count = 0;
    const duration = 2000;
    // // Call notification 3 times
    const interval = setInterval(async () => {
      await app.success({
        message: 'Hello, this is app notification!',
        duration,
      });
      await app.info({
        message: 'Hello, this is app notification!',
        duration,
      });
      await app.error({
        message: 'Hello, this is app notification!',
        duration,
      });
      clearInterval(interval);
    }, 300);
  }

  async callBrowserNotification() {
    const { notification: { browser } } = this.props;
    let count = 0;
    const duration = 2000;
    // // Call notification 3 times
    const interval = setInterval(async () => {
      await browser.success({
        title: 'Team Radio',
        message: 'Hello, this is browser notification',
        duration,
      });
      count += 1;
      if (count > 2) {
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
        title: 'Team Radio',
        message: 'Hello, this is browser notification',
        duration,
      });
      count += 1;
      if (count > 2) {
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
          <Grid item xs={4}>
            <Button
              raised
              // color="primary"
              style={{ background: '#2ecc71', color: 'white' }}
              onClick={this.callAppNotificationSuccess}
            >
              <span>App Notification Success</span>
            </Button>
            <br />
            <br />
          </Grid>
          <Grid item xs={4}>
            <Button
              raised
              color="secondary"
              onClick={this.callAppNotificationInfo}
            >
              <span>App Notification Info</span>
            </Button>
            <br />
            <br />
          </Grid>
          <Grid item xs={4}>
            <Button
              raised
              color="warning"
              style={{ background: '#f1c40f', color: 'white' }}
              onClick={this.callAppNotificationWarning}
            >
              <span>App Notification Warning</span>
            </Button>
            <br />
            <br />
          </Grid>
          <Grid item xs={4}>
            <Button
              raised
              color="error"
              style={{ background: '#e74c3c', color: 'white' }}
              onClick={this.callAppNotificationError}
            >
              <span>App Notification Error</span>
            </Button>
          </Grid>
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
