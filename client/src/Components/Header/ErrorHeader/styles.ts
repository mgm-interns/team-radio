import { createStyles } from '@material-ui/core';
import { RadioTheme } from 'Themes';

export const styles = ({ palette, spacing }: RadioTheme) =>
  createStyles({
    errorHeader: {
      background: palette.error.main
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
