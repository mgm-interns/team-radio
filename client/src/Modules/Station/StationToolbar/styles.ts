import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    onlineIcon: {
      marginRight: spacing.mediumUnit
    },
    onlineBadge: {
      top: 1,
      right: -8,
      background: palette.common.online,
      border: `1px solid ${palette.grey[200]}`
    }
  });
