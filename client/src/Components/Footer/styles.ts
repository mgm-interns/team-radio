import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    container: {
      background: palette.secondary.main,
      color: palette.secondary.contrastText,
      padding: spacing.largeUnit,
      textAlign: 'center'
    }
  });
