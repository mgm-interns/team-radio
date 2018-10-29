import { createStyles } from '@material-ui/core';
import { RadioTheme } from 'Themes';

export const styles = ({ palette, spacing }: RadioTheme) =>
  createStyles({
    onlineIcon: {
      marginRight: spacing.mediumUnit
    },
    onlineBadge: {
      top: 1,
      right: -15,
      background: palette.common.online,
      border: `1px solid ${palette.grey[200]}`
    }
  });
