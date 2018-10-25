import { createStyles } from '@material-ui/core';
import { RadioTheme } from 'Themes';

export const TABS_HEIGHT = 48;

export const styles = ({ palette, spacing }: RadioTheme) =>
  createStyles({
    container: {
      height: '100%'
    },
    tabContainer: {
      height: `calc(100% - ${TABS_HEIGHT}px - ${spacing.smallUnit}px)`,
      overflowY: 'auto',
      marginTop: spacing.smallUnit
    }
  });
