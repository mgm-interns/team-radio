import { createStyles } from '@material-ui/core';
import { RadioTheme } from 'Themes';

export const styles = ({ palette, spacing }: RadioTheme) =>
  createStyles({
    container: {
      background: palette.secondary.main,
      color: palette.secondary.contrastText,
      padding: spacing.largeUnit,
      textAlign: 'center'
    }
  });
