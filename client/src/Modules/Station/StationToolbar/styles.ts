import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  onlineIcon: {
    marginRight: spacing.mediumUnit
  },
  onlineBadge: {
    top: 1,
    right: -8,
    background: palette.common.online,
    border: `1px solid ${palette.grey[200]}`
  }
}));
