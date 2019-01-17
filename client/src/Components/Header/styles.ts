import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ThemeType } from 'Themes';

export const useStyles = makeStyles(({ palette, spacing, zIndex }: Theme) => ({
  container: {
    background: palette.type === ThemeType.LIGHT ? palette.primary.mainGradient : palette.secondary.mainGradient,
    zIndex: zIndex.drawer + 1
  },
  toolBarContainer: {
    justifyContent: 'space-between'
  },
  containerLeft: {
    display: 'flex',
    alignItems: 'center',
    color: palette.common.white
  },
  containerRight: {
    textAlign: 'end'
  },
  homeButton: {
    marginLeft: spacing.mediumUnit,
    color: palette.common.white
  },
  avatar: {
    background: palette.common.white,
    width: '1.25em',
    height: '1.25em'
  }
}));
