import { createStyles } from '@material-ui/core';
import { RadioTheme, ThemeType } from 'Themes';

export const styles = ({ palette, spacing, breakpoints }: RadioTheme) =>
  createStyles({
    onlineIcon: {
      marginRight: spacing.mediumUnit
    },
    onlineBadge: {
      top: 1,
      right: -15,
      background: palette.type === ThemeType.light ? palette.common.online : undefined,
      border: `1px solid ${palette.grey[200]}`
    }
  });
