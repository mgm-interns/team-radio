import { createStyles, Theme } from '@material-ui/core';
import { ThemeType } from 'Themes';

export const styles = ({ palette, spacing, zIndex }: Theme) =>
  createStyles({
    container: {
      background: palette.type === ThemeType.LIGHT ? palette.primary.main : palette.secondary.main,
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
  });
