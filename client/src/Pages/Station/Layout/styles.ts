import { createStyles } from '@material-ui/core';
import { RadioTheme } from 'Themes';

export const styles = ({ metrics, spacing, breakpoints }: RadioTheme) =>
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
      paddingLeft: spacing.mediumUnit,
      paddingRight: spacing.mediumUnit,
      marginRight: spacing.mediumUnit
    },
    drawerPaperMobile: {
      width: '50vw'
    },
    drawerPaperTablet: {
      width: 200
    },
    drawerPaperDesktop: {
      position: 'relative',
      width: 160,
      height: `calc(100vh - ${metrics.headerHeight}px - ${spacing.largeUnit}px)`,
      marginTop: spacing.mediumUnit
    },
    drawerPaperLargeDesktop: {
      position: 'relative',
      width: 200,
      height: `calc(100vh - ${metrics.headerHeight}px - ${spacing.largeUnit}px)`,
      marginTop: spacing.mediumUnit
    },
    halfHeight: {
      height: '50%'
    },
    fullHeight: {
      height: `calc(100vh - ${metrics.headerHeight}px)`
    },
    searchBoxOtherLayout: {
      height: `calc(100% - 300px)`
    },
    searchBoxLayout: {
      height: 300
    }
  });
