import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    container: {
      background: palette.secondary.mainGradient,
      color: palette.secondary.contrastText,
      padding: spacing.largeUnit,
      textAlign: 'center'
    }
  });
