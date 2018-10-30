import { createStyles } from '@material-ui/core';
import { RadioTheme } from 'Themes';

export const styles = ({ palette, spacing }: RadioTheme) =>
  createStyles({
    container: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    fullScreen: {
      position: 'fixed'
    }
  });
