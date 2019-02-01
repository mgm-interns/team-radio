import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  container: {
    marginTop: spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: spacing.unit
  }
}));
