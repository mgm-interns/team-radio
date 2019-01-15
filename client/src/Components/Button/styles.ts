import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    button: {
      marginLeft: spacing.mediumUnit,
      background: palette.primary.mainGradient
    },
    disabledButton: {
      background: palette.secondary.light
    }
  });
