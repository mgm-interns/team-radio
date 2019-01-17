import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  container: {
    background: palette.secondary.mainGradient,
    color: palette.secondary.contrastText,
    padding: spacing.largeUnit,
    textAlign: 'center'
  }
}));
