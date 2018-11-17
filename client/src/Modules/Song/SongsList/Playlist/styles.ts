import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ palette, spacing, typography }: Theme) =>
  createStyles({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    listContainer: {
      width: '100%',
      height: '100%',
      overflowY: 'auto'
    },
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
