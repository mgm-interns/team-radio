import React, { Component } from 'react';
import AppNotification from './AppNotification';
import BrowserNotification from './BrowserNotification';

export const NOTIFICATION_DURATION = 5000;

/**
 * HOC to pass a appNotification prop to its child
 * @param ChildComponent
 *
 * Available function in appNotification:
 * - add
 * - remove
 * - edit
 * - clear
 * - info
 * - success
 * - warning
 * - error
 */
export const withAppNotification = ChildComponent =>
  class extends Component {
    render() {
      return (
        <ChildComponent
          appNotification={AppNotification.instance}
          {...this.props}
        />
      );
    }
  };

/**
 * HOC to pass a browserNotification prop to its child
 * @param ChildComponent
 *
 * Available function in browserNotification:
 * - notify
 */
const browserNotification = new BrowserNotification();
export const withBrowserNotification = ChildComponent =>
  class extends Component {
    render() {
      return (
        <ChildComponent
          browserNotification={browserNotification}
          {...this.props}
        />
      );
    }
  };

export const withNotification = ChildComponent =>
  class extends Component {
    render() {
      return (
        <ChildComponent
          notification={{
            app: AppNotification.instance,
            browser: browserNotification,
          }}
          {...this.props}
        />
      );
    }
  };

export default {
  AppNotification,
  withAppNotification,
  BrowserNotification,
  withBrowserNotification,
  withNotification,
};
