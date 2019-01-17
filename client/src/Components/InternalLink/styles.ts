import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ zIndex }: Theme) => ({
  container: {
    textDecoration: 'none'
  }
}));
