import React, { Component } from 'react';
import AppNotification, { appNotificationInstance } from './AppNotification';
import BrowserNotification from './BrowserNotification';

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
          appNotification={appNotificationInstance}
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
 * - info
 * - success
 * - warning
 * - error
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

/**
 *
 * HOC to pass a notification prop to its child
 * @param ChildComponent
 *
 * Available props in notification:
 * - app: refer to withAppNotification
 * - browser: refer to withBrowserNotification
 */
export const withNotification = ChildComponent =>
  class extends Component {
    render() {
      return (
        <ChildComponent
          notification={{
            app: appNotificationInstance,
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
