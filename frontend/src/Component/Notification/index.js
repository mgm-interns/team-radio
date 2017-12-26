import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { levels } from 'react-notification-system/src/constants';
import withTheme from 'material-ui/styles/withTheme';
import { capitalizeFirstLetter } from 'material-ui/utils/helpers';
import sleep from 'Util/sleep';
import getStyles from './styles';

const DEFAULT_NOTIFICATION = {
  position: 'br',
  autoDismiss: 0,
};

let notificationRef = null;

class Notification extends Component {
  static get instance() {
    const instance = {
      add: async notification => {
        await sleep();
        return notificationRef.addNotification({
          ...DEFAULT_NOTIFICATION,
          ...notification,
        });
      },
      remove: async notification => {
        await sleep();
        return notificationRef.removeNotification({
          ...DEFAULT_NOTIFICATION,
          ...notification,
        });
      },
      edit: async notification => {
        await sleep();
        return notificationRef.editNotification({
          ...DEFAULT_NOTIFICATION,
          ...notification,
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
      const title = capitalizeFirstLetter(`${level} !`);
      instance[level] = notification =>
        instance.add({ level, title, ...notification });
    });
    return instance;
  }

  render() {
    const { theme } = this.props;
    return (
      <NotificationSystem
        ref={ref => {
          notificationRef = ref;
        }}
        style={getStyles(theme)}
      />
    );
  }
}

Notification.propTypes = {
  theme: PropTypes.object,
};

export default withTheme()(Notification);
