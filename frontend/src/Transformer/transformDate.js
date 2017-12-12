import moment from 'moment';
import { DATE_FORMAT } from '~/env';

const formatTimestamp = createdAt => {
  const date = new Date(createdAt);
  return moment(date)
    .local()
    .calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: 'dddd',
      sameElse: DATE_FORMAT,
    });
};

export default {
  formatTimestamp,
};
