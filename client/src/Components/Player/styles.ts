import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ typography, spacing }: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  tooltip: {
    ...typography.body1,
    marginLeft: spacing.largeUnit
  }
}));
