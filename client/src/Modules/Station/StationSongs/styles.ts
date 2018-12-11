import { createStyles, Theme } from '@material-ui/core';

export const TABS_HEIGHT = 48;

export const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    container: {
      height: '100%'
    },
    tabContainer: {
      height: `calc(100% - ${TABS_HEIGHT}px - ${spacing.smallUnit}px)`,
      overflowY: 'auto',
      marginTop: spacing.smallUnit
    },
    iconTab: {
      minWidth: 48,
      width: '33.33%'
    }
  });
