import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette, spacing, breakpoints }: Theme) => ({
  container: {
    minHeight: `100vh`
  },
  section: {},
  contentSection: {
    marginLeft: spacing.largeUnit,
    marginRight: spacing.largeUnit,
    [breakpoints.up('sm')]: {
      marginLeft: spacing.hugeUnit,
      marginRight: spacing.hugeUnit
    },
    [breakpoints.up('xl')]: {
      marginLeft: spacing.hugeUnit * 4,
      marginRight: spacing.hugeUnit * 4
    }
  },
  coverImgSection: {
    height: '30vh'
  },
  coverImg: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: '100% 100%'
  },
  avatarSection: {
    position: 'relative'
  },
  avatarImg: {
    position: 'absolute',
    bottom: 64,
    left: spacing.largeUnit,
    display: 'block',
    width: 80,
    height: 80,
    border: `2px solid ${palette.common.white}`,
    borderRadius: `${spacing.smallUnit}px ${spacing.smallUnit}px 0 ${spacing.smallUnit}px`,
    transition: 'all 0.3s',
    [breakpoints.up('sm')]: {
      left: 0,
      bottom: 0,
      width: 160,
      height: 160
    }
  },
  primaryAvatarImg: {
    borderColor: palette.primary.main
  },
  tabs: {
    marginLeft: 0,
    [breakpoints.up('sm')]: {
      marginLeft: 160
    }
  },
  tabContentSection: {
    marginTop: spacing.largeUnit,
    marginBottom: spacing.largeUnit
  }
}));
