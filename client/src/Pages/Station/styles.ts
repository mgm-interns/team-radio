import { createStyles } from '@material-ui/core';
import { RadioTheme } from 'Themes';

export const styles = ({ palette, spacing }: RadioTheme) =>
  createStyles({
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex'
    },
    container: {
      margin: 0,
      width: '100%',
      flexGrow: 1
    },
    drawerPaper: {
      position: 'relative',
      width: 240,
      height: '80vh',
      marginTop: spacing.mediumUnit,
      paddingLeft: spacing.mediumUnit,
      paddingRight: spacing.mediumUnit
    }
  });
