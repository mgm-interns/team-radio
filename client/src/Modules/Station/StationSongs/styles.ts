import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const TABS_HEIGHT = 48;

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  container: {
    height: '100%'
  },
  tabContainer: {
    height: `calc(100% - ${TABS_HEIGHT}px - ${spacing.smallUnit}px)`,
    overflowY: 'auto',
    marginTop: spacing.smallUnit
  },
  tabIconWrapper: {
    display: 'inline-table'
  },
  iconTab: {
    minWidth: 48,
    width: '33.33%'
  }
}));
