import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ palette, spacing, typography }: Theme) =>
  createStyles({
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
  });
