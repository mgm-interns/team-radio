import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette, spacing, zIndex }: Theme) => ({
  container: {
    position: 'fixed',
    bottom: spacing.headerHeight,
    left: spacing.unit,
    zIndex: zIndex.tooltip
  }
}));
