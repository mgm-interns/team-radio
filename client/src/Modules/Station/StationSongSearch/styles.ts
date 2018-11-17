import { createStyles, Theme } from '@material-ui/core';
import { ThemeType } from 'Themes';

export const styles = ({ palette, spacing }: Theme) =>
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
      '&::after': {
        borderBottomColor: palette.type === ThemeType.DARK ? palette.primary.main : undefined
      }
    },
    inputLabel: {},
    button: {
      marginLeft: spacing.mediumUnit
    }
  });
