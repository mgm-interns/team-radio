import { createStyles } from '@material-ui/core';
import { RadioTheme, ThemeType } from 'Themes';

export const styles = ({ palette, spacing }: RadioTheme) =>
  createStyles({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textField: {
      width: 200
    },
    input: {
      '&::before': {
        borderBottomColor: palette.type === ThemeType.LIGHT ? palette.primary.main : undefined
      },
      '&::after': {
        borderBottomColor: palette.type === ThemeType.DARK ? palette.common.white : undefined
      }
    },
    inputLabel: {}
  });
