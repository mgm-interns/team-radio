import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ typography, spacing }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    tooltip: {
      ...typography.body1,
      marginLeft: spacing.largeUnit
    }
  });
