import { createStyles } from '@material-ui/core';
import { RadioTheme } from 'Themes';

export const styles = ({ palette, spacing }: RadioTheme) =>
  createStyles({
    container: {
      background: 'transparent'
    },
    containerLeft: {
      display: 'flex',
      alignItems: 'center'
    },
    containerRight: {
      textAlign: 'end'
    },
    homeButton: {
      marginLeft: spacing.mediumUnit,

      '&:hover': {
        cursor: 'pointer'
      }
    }
  });
