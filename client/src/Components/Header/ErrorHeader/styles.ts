import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
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
}));
