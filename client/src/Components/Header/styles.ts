import { createStyles } from '@material-ui/core';
import { RadioTheme, ThemeType } from 'Themes';

export const styles = ({ palette, spacing, zIndex }: RadioTheme) =>
  createStyles({
    container: {
      background: palette.type === ThemeType.light ? palette.primary.main : palette.secondary.main,
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
    }
  });
