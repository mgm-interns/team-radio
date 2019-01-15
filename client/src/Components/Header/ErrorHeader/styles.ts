import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    errorHeader: {
      background: palette.error.mainGradient
    },
    errorIcon: {
      marginRight: spacing.mediumUnit
    },
    errorLeft: {
      display: 'flex'
    },
    errorRight: {
      marginLeft: 'auto'
    }
  });
