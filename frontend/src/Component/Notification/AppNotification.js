import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import withTheme from 'material-ui/styles/withTheme';
import { capitalizeFirstLetter } from 'material-ui/utils/helpers';
import sleep from 'Util/sleep';
import { NOTIFICATION_DURATION, LEVELS } from '.';
import getStyles from './styles';

const DEFAULT_NOTIFICATION = {
  position: 'br',
  autoDismiss: NOTIFICATION_DURATION / 1000,
};

let notificationRef = null;

/**
 * All methods have to sleep because notificationRef only get assigned
 * until AppNotification finish rendering
 *
 * @type {{add: function({duration?: *, others: *}), remove: function({others: *}), edit: function({others: *}), clear: function()}}
 */
const instance = {
  add: async ({ duration, ...others }) => {
    await sleep();
    return notificationRef.addNotification({
      autoDismiss: duration,
      ...DEFAULT_NOTIFICATION,
      ...others,
    });
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
Object.keys(LEVELS).map(key => {
  const level = LEVELS[key];
  const title = capitalizeFirstLetter(`${level} !`);
  instance[level] = notification =>
    instance.add({ level, title, ...notification });
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
