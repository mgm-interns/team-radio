import React, { Component } from 'react';
import { levels } from 'react-notification-system/src/constants';
import AppNotification from './AppNotification';
import BrowserNotification from './BrowserNotification';

export const NOTIFICATION_DURATION = 5000;
export const LEVELS = levels;

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
