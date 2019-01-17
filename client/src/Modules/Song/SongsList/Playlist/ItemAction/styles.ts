import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette, spacing, typography }: Theme) => ({
  iconButton: {
    fontSize: typography.body1.fontSize,
    marginRight: spacing.smallUnit,
    marginLeft: spacing.smallUnit
  },
  favoriteButton: {
    marginBottom: 1
  },
  badge: {
    top: -2,
    right: 14,
    background: 'inherit',
    color: palette.text.primary
  },
  linearProgress: {
    height: 1
  }
}));
