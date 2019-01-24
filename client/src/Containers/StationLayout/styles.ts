import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ThemeType } from '@Themes';

export const useStyles = makeStyles(({ metrics, spacing, palette }: Theme) => ({
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
    paddingTop: spacing.smallUnit,
    paddingBottom: spacing.smallUnit,
    marginRight: spacing.mediumUnit,
    borderRight: palette.type === ThemeType.DARK ? 'none' : undefined
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
  },
  drawerBottomSection: {
    marginTop: 'auto',
    paddingTop: spacing.unit,
    paddingBottom: spacing.unit
  },
  drawerBottomSectionIcon: {
    marginRight: spacing.mediumUnit,
    fontSize: 12
  }
}));
