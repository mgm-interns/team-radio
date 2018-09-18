import { createStyles } from '@material-ui/core';
import { RadioTheme } from 'Themes';

export const styles = ({ palette, spacing }: RadioTheme) =>
  createStyles({
    textLink: {
      color: palette.common.white,
      textDecoration: 'none'
    }
  });
