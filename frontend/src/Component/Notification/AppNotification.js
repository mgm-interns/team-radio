import PropTypes from 'prop-types';
import React from 'react';
import NotificationSystem from 'react-notification-system';
import withTheme from 'material-ui/styles/withTheme';
import sleep from 'Util/sleep';
import { levels } from 'react-notification-system/src/constants';
import getStyles from './styles';

const DEFAULT_NOTIFICATION = {
  position: 'tr',
  autoDismiss: 5,
};

let notificationRef = null;

/**
 * All methods have to call sleep() method
 * because notificationRef only get assigned
 * until AppNotification finish rendering
 *
 * @type {{add: function({duration?: *, others: *}), remove: function({others: *}), edit: function({others: *}), clear: function()}}
 */
const instance = {
  add: async ({ duration, ...others }) => {
    await sleep();
    const option = {
      ...DEFAULT_NOTIFICATION,
      ...others,
    };
    if (duration) {
      option.autoDismiss = duration / 1000;
    }
    return notificationRef.addNotification(option);
  },
  remove: async ({ ...others }) => {
    await sleep();
    return notificationRef.removeNotification({
      ...DEFAULT_NOTIFICATION,
      ...others,
    });
  },
  edit: async ({ ...others }) => {
    await sleep();
    return notificationRef.editNotification({
      ...DEFAULT_NOTIFICATION,
      ...others,
    });
  },
  clear: async () => {
    await sleep();
    return notificationRef.clearNotifications();
  },
};
/* eslint-disable array-callback-return */
Object.keys(levels).map(key => {
  const level = levels[key];
  instance[level] = notification => instance.add({ level, ...notification });
});

/**
 * Export the instance method of App Notification
 */
export const appNotificationInstance = instance;

/**
 * DO NOT import this Component
 * this Component only need to import once in root wrapper
 */
const AppNotification = ({ theme }) => (
  <NotificationSystem
    ref={ref => {
      notificationRef = ref;
    }}
    style={getStyles(theme)}
  />
);

AppNotification.propTypes = {
  theme: PropTypes.object,
};

export default withTheme()(AppNotification);
